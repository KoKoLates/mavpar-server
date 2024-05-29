mod model;
mod handler;

use std::sync::Mutex;
use actix_cors::Cors;

use actix_web::middleware::Logger;
use actix_web::{web, App, HttpServer};
use crate::model::{Services, AppState};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    
    let services = web::Data::new(AppState {
        services: Mutex::new(Services::default()),
    });

    let data = services.clone();
    tokio::spawn(async move {
        handler::load_services(data).await;
    });

    log::log!(log::Level::Info, "Starting Server at http://127.0.0.1:8080");

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_header()
            .allow_any_method()
            .supports_credentials();
        App::new()
            .app_data(services.clone())
            .wrap(Logger::new("%a %r %s"))
            .wrap(cors)
            .service(handler::get_config)
            .service(handler::get_default)
            .service(handler::update)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
