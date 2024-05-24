use actix_web::dev::ServiceRequest;
use actix_web::middleware::Logger;
use actix_web::{web, App, Error, HttpServer};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use actix_web_httpauth::middleware::HttpAuthentication;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(hello))
            .route("/greet", web::post().to(greet))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
