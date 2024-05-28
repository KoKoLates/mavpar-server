use std::fs;
use log::info;

use crate::model::{Services, AppState};
use actix_web::{get, post, web, HttpResponse, Responder};


#[get("/config")]
pub async fn get_config(data: web::Data<AppState>) -> impl Responder {
    let services = data.services.lock().unwrap();
    HttpResponse::Ok().json(&*services)
}


#[get("/default")]
pub async fn get_default(data: web::Data<AppState>) -> impl Responder {
    fn internal_server_error<T: ToString>(message: T) -> HttpResponse {
        HttpResponse::InternalServerError().body(message.to_string())
    }

    let file_content = match fs::read_to_string("default.json") {
        Ok(content) => content,
        Err(e) => return internal_server_error(format!("Failed to read default.json: {}", e)),
    };

    let default_services: Services = match serde_json::from_str(&file_content) {
        Ok(services) => services,
        Err(e) => return internal_server_error(format!("Failed to parse default.json: {}", e)),
    };

    let mut services = data.services.lock().unwrap();
    *services = default_services.clone();

    if let Err(e) = fs::write("services.json", serde_json::to_string(&default_services).unwrap()) {
        return internal_server_error(format!("Failed to write to services.json: {}", e));
    }

    HttpResponse::Ok().json(&*services)
}


#[post("/update")]
pub async fn update(data: web::Data<AppState>, info: web::Json<Services>) -> impl Responder {
    let mut services = data.services.lock().unwrap();

    fn update_field(original: &mut String, new_value: String) {
        if !new_value.is_empty() {
            *original = new_value;
        }
    }

    update_field(&mut services.mavproxy.host, info.mavproxy.host.clone());
    update_field(&mut services.mavproxy.port, info.mavproxy.port.clone());

    update_field(&mut services.streamer.host, info.streamer.host.clone());
    update_field(&mut services.streamer.port, info.streamer.port.clone());

    if let Err(e) = fs::write("services.json", serde_json::to_string(&*services).unwrap()) {
        return HttpResponse::InternalServerError().body(format!("Failed to write to file: {}", e));
    }
    println!("Updated services: {}", serde_json::to_string(&*services).unwrap());

    info!("Updated services: {:?}", &*services);
    HttpResponse::Ok().json(&*services)
}


pub async fn load_services(data: web::Data<AppState>) -> impl Responder {
    match fs::read_to_string("services.json") {
        Ok(file_content) => {
            let services: Services = match serde_json::from_str(&file_content) {
                Ok(s) => s,
                Err(_) => Services::default(),
            };
            let mut services_lock = data.services.lock().unwrap();
            *services_lock = services.clone();
            HttpResponse::Ok().json(&*services_lock)
        },
        Err(_) => HttpResponse::Ok().json(&*data.services.lock().unwrap()),
    }
}
