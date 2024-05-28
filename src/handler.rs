
use std::fs;
use log::info;

use crate::model::{Services, AppState};
use actix_web::{get, post, web, HttpResponse, Responder};


#[get("/config")]
pub async fn get_config(data: web::Data<AppState>) -> impl Responder {
    let services = data.services.lock().unwrap();
    HttpResponse::Ok().json(&*services)
}

#[post("/update")]
pub async fn update(data: web::Data<AppState>, info: web::Json<Services>) -> impl Responder {
    let mut services = data.services.lock().unwrap();
    *services = info.into_inner();

    // if let Err(e) = fs::write("services.json", serde_json::to_string(&*services).unwrap()) {
    //     return HttpResponse::InternalServerError().body(format!("Failed to write to file: {}", e));
    // }
    println!("Updated services: {}", serde_json::to_string(&*services).unwrap());

    info!("Updated services: {:?}", &*services);
    HttpResponse::Ok().json(&*services)
}

pub async fn load_services(data: web::Data<AppState>) -> impl Responder {
    match fs::read_to_string("config.json") {
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
