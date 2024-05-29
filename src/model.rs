use std::sync::Mutex;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Service {
    pub host: String,
    pub port: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Services {
    pub mavproxy: Service,
    pub streamer: Service,
}

impl Default for Services {
    fn default() -> Self {
        fn create_service(host: &str, port: &str) -> Service {
            Service { host: host.into(), port: port.into() }
        }

        Self {
            mavproxy: create_service("127.0.0.1", "8080"),
            streamer: create_service("127.0.0.1", "9090"),
        }
    }
}

pub struct AppState {
    pub services: Mutex<Services>,
}
