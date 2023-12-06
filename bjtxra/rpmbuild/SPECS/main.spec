Name: mynginx
Version: 1.0
Release: 1%{?dist}
Summary: My Custom Nginx RPM
License: MIT

%description
This is a custom RPM package for Nginx.

%install
mkdir -p %{buildroot}/opt/nginx
cp docker-ngixn.1.24.0.tar.gz %{buildroot}/opt/nginx/

%post
docker load -i /opt/nginx/docker-ngixn.1.24.0.tar.gz
docker run -d -p 8866:80 nginx:1.24.0

%files
/opt/nginx/docker-ngixn.1.24.0.tar.gz

%changelog
# Changelog entries go here
