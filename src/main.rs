use actix_web::{web, App, HttpServer};
use crate::model::{Services, AppState};

use log::info;
use std::sync::Mutex;
use actix_cors::Cors;

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
        handler::load_services(data).await;
    });

    info!("Starting server at http://127.0.0.1:8080");

    HttpServer::new(move || {
        App::new()
            .app_data(services.clone())
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allow_any_method()
                    .allow_any_header()
            )
            .service(handler::get_config)
            .service(handler::update)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
