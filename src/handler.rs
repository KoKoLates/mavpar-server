use actix_web::{web, HttpResponse, Responder};
use std::fs;
use std::sync::Mutex;
use crate::model::{Services, AppState};
use log::info;

pub async fn get_services(data: web::Data<AppState>) -> impl Responder {
    let services = data.services.lock().unwrap();
    HttpResponse::Ok().json(&*services)
}

pub async fn update_service(data: web::Data<AppState>, info: web::Json<Services>) -> impl Responder {
    let mut services = data.services.lock().unwrap();
    *services = info.into_inner();

    if let Err(e) = fs::write("services.json", serde_json::to_string(&*services).unwrap()) {
        return HttpResponse::InternalServerError().body(format!("Failed to write to file: {}", e));
    }

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
