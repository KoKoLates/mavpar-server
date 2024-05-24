use actix_web::{web, App, HttpResponse, HttpServer, Responder};

async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello, world!")
}

async fn greet(info: web::Json<Info>) -> impl Responder {
    HttpResponse::Ok().body(format!("Hello, {}", info.message))
}
