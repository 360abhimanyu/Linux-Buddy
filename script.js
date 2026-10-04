/* ==========================================
   LINUX BUDDY
   Student Friendly Learning Assistant
========================================== */


let currentMode = "explain";


/* ==========================================
   MODE INFORMATION
========================================== */

const modes = {

    explain: {

        title: "Explain Mode",

        emoji: "💡",

        description:
            "Learn Linux concepts in simple language.",

        welcome:
            `👋 Hey! Welcome to Linux Buddy.

I'm here to help you learn Linux without making it complicated. 😊

You can ask me things like:

• What is Linux?
• Explain ls
• What is SSH?
• Explain chmod
• What is Docker?

Don't worry about asking basic questions.
Everyone starts somewhere! 🚀`

    },


    troubleshoot: {

        title: "Troubleshoot Mode",

        emoji: "🔧",

        description:
            "Let's solve your Linux problem step by step.",

        welcome:
            `🔧 Don't worry — we'll figure it out together!

Tell me what is going wrong with your Linux system.

For example:

"My Nginx server is not working."

"My disk is full."

"I cannot connect using SSH."

I'll guide you step by step instead of just giving you a command.`

    },


    lab: {

        title: "Practice Lab",

        emoji: "🧪",

        description:
            "Practice Linux using real-world scenarios.",

        welcome:
            `🧪 Ready to practice?

I'll give you a real-world Linux situation and guide you through it.

You can practice:

• Networking
• Permissions
• Processes
• Storage
• Services
• Nginx

Learning happens when you practice! 💪`

    },


    interview: {

        title: "Interview Mode",

        emoji: "🎯",

        description:
            "Test your Linux knowledge.",

        welcome:
            `🎯 Interview Mode!

I'll ask you Linux interview questions one at a time.

Don't worry if you don't know the answer.
I'll explain it after your attempt.

Type:

start

when you're ready. 🚀`

    }

};


/* ==========================================
   ELEMENTS
========================================== */

const chatMessages =
    document.getElementById("chatMessages");

const userInput =
    document.getElementById("userInput");

const chatForm =
    document.getElementById("chatForm");

const suggestions =
    document.getElementById("suggestions");

const modeTitle =
    document.getElementById("modeTitle");

const modeDescription =
    document.getElementById("modeDescription");

const modeEmoji =
    document.getElementById("modeEmoji");

const clearChat =
    document.getElementById("clearChat");


/* ==========================================
   ADD MESSAGE
========================================== */

function addMessage(text, sender = "bot") {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        `message ${sender}`;


    const content =
        document.createElement("div");

    content.className =
        "message-content";


    content.textContent =
        text;


    wrapper.appendChild(content);


    chatMessages.appendChild(wrapper);


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


/* ==========================================
   CHANGE MODE
========================================== */

function changeMode(mode) {

    currentMode = mode;


    /* Active learning card */

    document
        .querySelectorAll(".learning-card")
        .forEach(card => {

            card.style.transform =
                card.dataset.mode === mode
                    ? "translateY(-5px)"
                    : "";

        });


    /* Header information */

    modeTitle.textContent =
        modes[mode].title;


    modeDescription.textContent =
        modes[mode].description;


    modeEmoji.textContent =
        modes[mode].emoji;


    /* Clear conversation */

    chatMessages.innerHTML = "";


    /* Welcome */

    addMessage(
        modes[mode].welcome
    );


    updateSuggestions(mode);


    /* Scroll */

    scrollToAssistant();

}


/* ==========================================
   SUGGESTIONS
========================================== */

function updateSuggestions(mode) {

    const suggestionsByMode = {

        explain: [

            "What is Linux?",

            "Explain ls",

            "Explain chmod",

            "What is SSH?"

        ],


        troubleshoot: [

            "Nginx is not working",

            "My disk is full",

            "SSH is not connecting"

        ],


        lab: [

            "Networking lab",

            "Permissions lab",

            "Process lab"

        ],


        interview: [

            "start"

        ]

    };


    suggestions.innerHTML = "";


    suggestionsByMode[mode]
        .forEach(text => {

            const button =
                document.createElement("button");

            button.className =
                "suggestion";

            button.textContent =
                text;


            button.onclick = function () {

                userInput.value =
                    text;

                sendMessage();

            };


            suggestions.appendChild(button);

        });

}


/* ==========================================
   SEND MESSAGE
========================================== */

function sendMessage() {

    const question =
        userInput.value.trim();


    if (!question) {

        return;

    }


    addMessage(
        question,
        "user"
    );


    userInput.value = "";


    /* Small thinking delay */

    setTimeout(() => {

        const response =
            generateResponse(question);


        addMessage(
            response
        );

    }, 350);

}


/* ==========================================
   RESPONSE ENGINE
========================================== */

function generateResponse(question) {

    const q =
        question.toLowerCase();


    /* ======================================
       TROUBLESHOOTING
    ====================================== */

    if (
        currentMode ===
        "troubleshoot"
    ) {


        /* NGINX */

        if (
            q.includes("nginx") ||
            q.includes("website")
        ) {

            return `
🔧 Let's solve this together.

Don't worry — we'll troubleshoot it step by step.


STEP 1
Check if Nginx is running.

Run:

systemctl status nginx


STEP 2
If it is stopped, try:

sudo systemctl restart nginx


STEP 3
Check whether port 80 is listening:

sudo ss -tulpn | grep :80


STEP 4
Test Nginx locally:

curl http://localhost


STEP 5
Check the firewall:

sudo ufw status


💡 TIP

Don't run many commands randomly.

Run one command, understand the result,
then decide what to do next.
`;

        }


        /* DISK */

        if (
            q.includes("disk") ||
            q.includes("space")
        ) {

            return `
💾 Let's find out why your disk is full.

STEP 1

Check filesystem usage:

df -h


Look for a filesystem close to 100%.


STEP 2

Find large directories:

du -sh /* 2>/dev/null


Useful commands:

du -sh /var/*

du -sh /home/*


💡 Remember:

df = filesystem usage

du = directory/file usage


Try the first command and
tell me what you see.
`;

        }


        /* SSH */

        if (q.includes("ssh")) {

            return `
🔐 Let's troubleshoot SSH.

STEP 1

Check the SSH service:

sudo systemctl status ssh


STEP 2

Check port 22:

sudo ss -tulpn | grep :22


STEP 3

Test connectivity:

ping <server-ip>


STEP 4

Try SSH:

ssh username@server-ip


💡 If you get an error,
send me the exact error message
and we'll investigate it together.
`;

        }


        return `
🔧 Tell me about your problem.

For example:

"My Ubuntu server is not connecting."

"Nginx is showing an error."

"My disk is full."

"I cannot SSH into my server."

I'll help you troubleshoot it
step by step. 😊
`;

    }


    /* ======================================
       LAB
    ====================================== */

    if (currentMode === "lab") {


        if (q.includes("network")) {

            return `
🧪 NETWORKING CHALLENGE

Imagine this:

Your web server is running,
but users cannot open your website.


🎯 YOUR MISSION

Find the problem.


STEP 1

Find the server IP.

Hint:

ip addr


STEP 2

Test connectivity.

Hint:

ping


STEP 3

Check listening ports.

Hint:

ss -tulpn


STEP 4

Test the web server.

Hint:

curl http://localhost


STEP 5

Check firewall.

Hint:

sudo ufw status


🏆 Challenge:

Can you determine whether the problem
is the network, service, port or firewall?

Try it yourself first!
`;

        }


        if (q.includes("permission")) {

            return `
🧪 FILE PERMISSIONS CHALLENGE

Scenario:

A student created a file but
another user cannot modify it.


TASK 1

Create the file:

touch project.txt


TASK 2

Check permissions:

ls -l project.txt


TASK 3

Change permissions:

chmod 644 project.txt


TASK 4

Check again:

ls -l project.txt


🎯 Goal:

Understand:

Owner
Group
Read
Write
Execute
`;

        }


        if (q.includes("process")) {

            return `
🧪 PROCESS CHALLENGE

Scenario:

Your Linux server suddenly
becomes very slow.


🎯 YOUR MISSION

Find the process causing the problem.


STEP 1

ps aux


STEP 2

top


STEP 3

Find a process:

pgrep nginx


STEP 4

Investigate the process.


💡 Tip:

Don't kill a process until
you understand what it does.
`;

        }


        return `
🧪 Choose your challenge:

🌐 Networking

🔐 Permissions

⚙️ Processes

💾 Storage

🌍 Nginx


Example:

"Give me a networking lab"
`;

    }


    /* ======================================
       INTERVIEW
    ====================================== */

    if (currentMode === "interview") {


        if (
            q.includes("start") ||
            q.includes("begin")
        ) {

            return `
🎯 QUESTION 1


What is the difference between:


df


and


du?


Take your time.

Explain it in your own words.

There is no penalty for trying! 😊
`;

        }


        if (
            q.includes("df") &&
            q.includes("du")
        ) {

            return `
🎉 Nice!

You're on the right track.


df

shows filesystem disk usage.


du

shows how much space files
and directories are using.


🔥 NEXT QUESTION


Which command shows
running processes?


A) ls

B) ps

C) mkdir

D) pwd


Your answer?
`;

        }


        return `
💭 Think about the question.

Remember:

A good interview answer should explain:

• What the command does
• When you use it
• Why you use it


Give it a try!

Type "start" to begin again.
`;

    }


    /* ======================================
       EXPLAIN
    ====================================== */


    /* LINUX */

    if (
        q.includes("what is linux") ||
        q === "linux"
    ) {

        return `
🐧 WHAT IS LINUX?


Think of Linux as the foundation
that helps software communicate
with computer hardware.


Linux is an open-source
operating system kernel.


You will find Linux everywhere:


☁️ Cloud

🖥️ Servers

🐳 Containers

⚙️ DevOps

📱 Embedded systems

🚀 Supercomputers


Popular Linux distributions:

• Ubuntu
• Debian
• Fedora
• Red Hat


💡 Simple idea:

Linux = a foundation for
running software and services.
`;

    }


    /* LS */

    if (q.includes("ls")) {

        return `
📁 THE ls COMMAND


The ls command helps you
see what's inside a directory.


Think of it like:

"Show me what is here."


Basic:

ls


Detailed:

ls -l


Hidden files:

ls -a


Human-readable:

ls -lh


Everything together:

ls -lah


💡 Try:

ls -lah /var/log
`;

    }


    /* PWD */

    if (q.includes("pwd")) {

        return `
📍 THE pwd COMMAND


pwd means:

Print Working Directory


It answers:

"Where am I right now?"


Run:

pwd


Example:

/home/student


💡 Think of it like
checking your current location
inside the Linux filesystem.
`;

    }


    /* CD */

    if (q.includes("cd")) {

        return `
📂 THE cd COMMAND


cd means:

Change Directory


Think:

"Take me somewhere else."


Examples:


cd /var/log

Go to /var/log.


cd ~

Go home.


cd ..

Go one directory up.


cd -

Go back to your previous location.
`;

    }


    /* CHMOD */

    if (q.includes("chmod")) {

        return `
🔐 THE chmod COMMAND


chmod changes file permissions.


Example:

chmod 644 file.txt


Remember:


4 = Read

2 = Write

1 = Execute


Therefore:


6 = Read + Write


Example:

chmod 755 script.sh


💡 Try using:

ls -l

before and after chmod
to see the permission change.
`;

    }


    /* SSH */

    if (q.includes("ssh")) {

        return `
🔐 SSH


SSH means:

Secure Shell


It allows you to connect
to another Linux machine securely.


Example:

ssh username@server-ip


For example:

ssh ubuntu@192.168.1.10


💡 SSH is extremely important
for cloud and DevOps engineers.
`;

    }


    /* DOCKER */

    if (q.includes("docker")) {

        return `
🐳 DOCKER


Docker allows applications
to run inside containers.


Think of a container as
a small isolated environment
for your application.


Useful commands:


docker ps

See running containers.


docker ps -a

See all containers.


docker images

See Docker images.


docker run nginx

Start an Nginx container.


💡 Docker is widely used
in DevOps and cloud computing.
`;

    }


    /* NGINX */

    if (q.includes("nginx")) {

        return `
🌐 NGINX


Nginx is a popular
web server and reverse proxy.


Useful commands:


systemctl status nginx

Check status.


sudo systemctl start nginx

Start Nginx.


sudo systemctl restart nginx

Restart Nginx.


sudo systemctl enable nginx

Start Nginx automatically
when the system boots.


💡 Having a problem?

Switch to 🔧 Troubleshoot Mode.
`;

    }


    /* DEFAULT */

    return `
🤔 I don't know that topic yet.


But that's okay! 😊


Try asking:


🐧 What is Linux?

📁 Explain ls

📍 Explain pwd

🔐 Explain chmod

🔑 What is SSH?

🐳 Explain Docker

🌐 Explain Nginx


💡 In the next version,
Linux Buddy will use an open-weight
AI model such as Gemma so it can
answer a much wider range of
Linux questions.
`;

}


/* ==========================================
   LEARNING CARDS
========================================== */

document
    .querySelectorAll(".learning-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            function () {

                changeMode(
                    card.dataset.mode
                );

            }
        );

    });


/* ==========================================
   FORM
========================================== */

chatForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        sendMessage();

    }
);


/* ==========================================
   QUICK TOPICS
========================================== */

document
    .querySelectorAll(
        ".topic-grid button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                userInput.value =
                    button.dataset.question;

                sendMessage();

                scrollToAssistant();

            }
        );

    });


/* ==========================================
   CLEAR CHAT
========================================== */

clearChat.addEventListener(
    "click",
    function () {

        chatMessages.innerHTML = "";

        addMessage(
            modes[currentMode].welcome
        );

    }
);


/* ==========================================
   START LEARNING
========================================== */

function startLearning() {

    changeMode("explain");

}


/* ==========================================
   SCROLL TO ASSISTANT
========================================== */

function scrollToAssistant() {

    document
        .getElementById("assistant")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ==========================================
   INITIALIZE
========================================== */

changeMode("explain");