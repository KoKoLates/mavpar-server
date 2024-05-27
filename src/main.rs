use actix_web::{web, App, HttpServer};
use std::sync::Mutex;
use crate::model::{Services, AppState};
use crate::handler::{get_services, update_service, load_services};
use log::info;

mod model;
mod handler;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();
    
    let services = web::Data::new(AppState {
        services: Mutex::new(Services::default()),
    });

    let data = services.clone();
    tokio::spawn(async move {
        load_services(data).await;
    });

    info!("Starting server at http://127.0.0.1:8080");

    HttpServer::new(move || {
        App::new()
            .app_data(services.clone())
            .route("/get_services", web::get().to(get_services))
            .route("/update_service", web::post().to(update_service))
            .route("/load_services", web::get().to(load_services))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
