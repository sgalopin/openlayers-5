# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "debian/contrib-stretch64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.network "private_network", ip: "192.168.50.23"
  config.vm.hostname = "ol5.dev.net"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Getting BrowserSync working with Vagrant
  #config.vm.network :forwarded_port, guest: 80, host: 8080, auto_correct: true
  #config.vm.network :forwarded_port, guest: 3001, host: 3001, auto_correct: true

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Disable the default root
  config.vm.synced_folder ".", "/vagrant", disabled: true
  # Sync the application dir
  # On Windows, rsync installed with Cygwin or MinGW will be detected by Vagrant and works well.
  config.vm.synced_folder "./app/htdocs", "/var/www/app/htdocs", create: true, owner: "vagrant", group: "vagrant"

  # Provisions for the "server.js" file
  config.vm.provision "file", source: "./app/server.js", destination: "/var/tmp/server.js", run: "always"
  config.vm.provision "shell", privileged: false, run: "always", inline: <<-SHELL
    sudo mv /var/tmp/server.js /var/www/app/server.js
  SHELL
  
  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.
  config.vm.provider "virtualbox" do |v|
    v.memory = 4096
    v.cpus = 2
    v.name = "ol5-server"
  end

  # Define a Vagrant Push strategy for pushing to Atlas. Other push strategies
  # such as FTP and Heroku are also available. See the documentation at
  # https://docs.vagrantup.com/v2/push/atlas.html for more information.
  # config.push.define "atlas" do |push|
  #   push.app = "YOUR_ATLAS_USERNAME/YOUR_APPLICATION_NAME"
  # end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  # config.vm.provision "shell", inline: <<-SHELL
  #   apt-get update
  #   apt-get install -y apache2
  # SHELL
  config.vm.provision "shell", privileged: true, inline: <<-SHELL

    ########################
    # Packages and Sources #
    ########################
    # apt update and upgrade
    apt-get update
    DEBIAN_FRONTEND=noninteractive apt-get -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold" upgrade
    # Node and npm (npm is distributed with Node.js)
    apt-get install -y curl
    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
    apt-get install -y nodejs
    # To compile and install native addons from npm you may also need to install build tools
    apt-get install -y build-essential
    # Port 80 requires elevated privileges
    # https://docs.requarks.io/wiki/troubleshooting#error-listening-on-port-xx-requires-elevated-privileges
    apt-get install -y libcap2-bin
    setcap 'cap_net_bind_service=+ep' `which node`
	# Add the required npm packages
	npm install express serve-static ol
  SHELL

  # Provision "npm-install"
  config.vm.provision "start", type: "shell", privileged: false, run: "always", inline: <<-SHELL
	# cd /var/www/app && sudo DEBUG=app:* npm start
    cd /var/www/app && node server.js
  SHELL

end