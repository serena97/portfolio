provider "google" {
  credentials = file("/Users/serena/.config/gcloud/application_default_credentials.json")
  project     = "serenachan-io"
  region      = "us-east1"
  zone        = "us-east1-b"
}

resource "google_compute_instance" "default" {
  name         = "serenachan-io"
  machine_type = "f1-micro"
  zone         = "us-east1-b"

  tags = ["http-server", "https-server"]
  boot_disk {
    initialize_params {
      image = "debian-10-buster-v20200910"
      size  = "30"
    }
  }

  network_interface {
    network = "default"

    access_config {
      // Ephemeral IP
    }
  }

  service_account {
    scopes = [
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring.write",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/servicecontrol",
      "https://www.googleapis.com/auth/trace.append",
    ]
  }
}
