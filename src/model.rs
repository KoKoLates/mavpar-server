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
        Services {
            mavproxy: Service { host: "127.0.0.1".into(), port: "8080".into() },
            streamer: Service { host: "127.0.0.1".into(), port: "9090".into() },
        }
    }
}


pub struct AppState {
    pub services: Mutex<Services>,
}
