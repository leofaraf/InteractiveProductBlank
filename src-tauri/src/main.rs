// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fmt::write, fs::File, io::Write};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn db() -> String {
    std::fs::read_to_string("db.json").expect("db.json isn't exists")
}

#[tauri::command]
fn save(data: String) {
    let mut file = File::create("result.txt").unwrap();
    file.write_all(data.as_bytes()).unwrap();
    file.sync_all().unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![db, save])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
