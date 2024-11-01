document.addEventListener("DOMContentLoaded", function () {
    // Variable Declarations
    const output = document.getElementById("output");
    const input = document.getElementById("input");
    const titleElement = document.getElementById("title");
    const ipElement = document.getElementById("ip");

    const titleText = "Welcome to Dobliuw's Resume";
    const loadingText = "\n  ######################################################################\n"

    let commandHistory = [];
    let historyIndex = -1;
    let visitorIP = null;
    let IPInfo = null;
    let isTyping = false;

    // Write title letter by letter like a stdout
    function typeTitle(text, element, speed, index = 0) {
        isTyping = true;
        if (index < text.length) {
            element.innerHTML += text[index];
            element.scrollTop = element.scrollHeight;
            setTimeout(() => typeTitle(text, element, speed, index + 1), speed); // Controla la velocidad de escritura
        } else {
            // Add blinking pipe at the end
            isTyping = false;
            if (!bannerWrote){
                const cursor = document.createElement("span");
                cursor.classList.add("cursor");
                cursor.textContent = "|";
                element.appendChild(cursor);
            }    
        }
    }

    //  Call the function to write the title
    typeTitle(titleText, titleElement, 100);

    function handleCommand(command) {
        if (isTyping) return;

        // Command history management
        commandHistory.push(command);
        historyIndex = commandHistory.length;

        // Show the command executed in the console
        output.innerHTML += `dobliuw@kali$ ${command}\n`;

        // Commands 
        switch (command.toLowerCase()) {
            case "about":
                let about = loadingText + "\nHey! I'm Dobliuw (W).... a Pentester with a strong focus on cybersecurity, networks and programming.\nCurrently, I've been working mainly in system monitoring and defense and currently working on the Vulnerability Management Team, but I’m looking forward to doing what I'm passionate about, offensive security as a Profesional Pentester moving into the red team role.\n\nMy experience includes network protocols and configuration (I'm doing the CCNA 1 rigth now - 10/31/2024), deep programming in languages like Python, Bash and JavaScript and programming ability in other laguages like PHP, PowerShell, Batch, etc. , and OS internals, both in Windows and Linux environments. I’m continually expanding my knowledge in hacking and electronics, aiming to deepen my technical skills to better understand and address today’s security challenges..\n" + loadingText + '\n';
                typeTitle(about, output, 10);
                break;
            case "articles":
                output.innerHTML += "<a style='color:white' href='./notes/index.html'>\n\t\t\tDOBLIUWS NOTES SECTION\n\n</a>";
                let articles ="\nYou choosen the option to see all my knowledge captured in articles. You will find a tree architecture where you can find notes about Offesive Cybersecurity, Defensive Cybersecurity, Operative Systems, Networks, Programming Languagues, Low Level Concepts, Electronic, Hardware Things and more!\n\nEnjoy and learn!\n\n"
                typeTitle(articles, output, 10);
                break;
            case "help":
                output.innerHTML += "Available commands: about, articles, help, clear\n\n";
                output.scrollTop = output.scrollHeight; // Auto-scroll
                break;
            case "clear":
                output.innerHTML = "";
                break;
            default:
                output.innerHTML += "Command not found. Type 'help' for a list of commands.\n\n";
                output.scrollTop = output.scrollHeight; // Auto-scroll
                break;
        }

        // Auto scroll 
        output.scrollTop = output.scrollHeight;
        input.value = ""; // Clear stdout after command execution
        bannerElement.innerHTML = ""
    }

    // Function to get your IP and Info
    const getVisitorIP = async () => {
        try{
            const response = await fetch("https://api.ipify.org?format=json");
            const data = await response.json();
            visitorIP = data.ip;
            // const response2 = await fetch(`https://ipinfo.io/${visitorIP}/json?TOKEN=${token}`)
            // IPInfo = await response2.json();

        }catch(e){
            console.error("Error fetching to the api.", e);
        }
    }

    // Section to TRY determinate if you have a good online security (Could be fail)
    getVisitorIP().then(() => {
        const vpnProviders = ["PacketHub S.A.", "M247 Europe SRL", "Choopa LLC", "Digital Ocean", "Proton Technologies AG", "NordVPN", "ExpressVPN", "CyberGhost", "Private Internet Access", "ProtonVPN"];
        if(visitorIP){
            // if (IPInfo){
            //     if (vpnProviders.some(provider => IPInfo.org.toLowerCase().includes(provider.toLowerCase()))){
            //         ipElement.innerHTML = `<b style='color:green'>NICE!</b> Your IP looks like one from a VPN <b style='color:green'>${visitorIP}</b>. Good security!`
            //     }else{
            //         ipElement.innerHTML = `<b style='color:red'>WARNING:</b> Your IP could be exposed <b style='color:red'>${visitorIP}</b>. Advice? Use a VPN (If u are using it, ignore me)`
            //     }
            // }else{
                ipElement.innerHTML = `<b style='color:red'>WARNING:</b> Your IP could be exposed <b style='color:red'>${visitorIP}</b>. Advice? Use a VPN (If u are using it, ignore me)`
            // }
        }
    })

    // Capture the user event
    input.addEventListener("keydown", function (event) {
        if (isTyping) return;
        if (event.key === "Enter") {
            const command = input.value.trim();
            if (command) handleCommand(command);
        } else if (event.key === "ArrowUp") {
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        } else if (event.key === "ArrowDown") {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                input.value = "";
            }
        }
    });
});

