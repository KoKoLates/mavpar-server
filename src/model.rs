use serde::{Deserialize, Serialize};
use std::sync::Mutex;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Service {
    pub ip: String,
    pub port: u16,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Services {
    pub mavproxy: Service,
    pub gstreamer: Service,
}

impl Default for Services {
    fn default() -> Self {
        Services {
            mavproxy: Service { ip: "127.0.0.1".into(), port: 8080 },
            gstreamer: Service { ip: "127.0.0.1".into(), port: 9090 },
        }
    }
}

pub struct AppState {
    pub services: Mutex<Services>,
}
