#!/bin/bash

# mkdir -p ./{BUILD,BUILDROOT,RPMS,SOURCES,SPECS,SRPMS}
rpmbuild -ba SPECS/main.spec
tree RPMS/