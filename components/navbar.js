class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
                nav {
                    background: linear-gradient(135deg, rgba(30, 64, 175, 0.95), rgba(59, 130, 246, 0.95));
                    backdrop-filter: blur(10px);
                    padding: 1rem 2rem;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }
                
                .nav-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    color: white;
                    font-weight: 700;
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .nav-menu {
                    display: flex;
                    gap: 2rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    align-items: center;
                }
                
                .nav-link {
                    color: white;
                    text-decoration: none;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 500;
                }
                
                .nav-link:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
                }
                
                .nav-link.active {
                    background: rgba(255, 255, 255, 0.3);
                }
                
                .mobile-menu-toggle {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 0.5rem;
                }
                
                @media (max-width: 768px) {
                    .nav-menu {
                        position: fixed;
                        left: -100%;
                        top: 70px;
                        flex-direction: column;
                        background: linear-gradient(135deg, rgba(30, 64, 175, 0.98), rgba(59, 130, 246, 0.98));
                        width: 100%;
                        text-align: center;
                        transition: 0.3s;
                        box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
                        padding: 2rem 0;
                    }
                    
                    .nav-menu.active {
                        left: 0;
                    }
                    
                    .mobile-menu-toggle {
                        display: block;
                    }
                }
            </style>
            <nav>
                <div class="nav-container">
                    <div class="logo">
                        ⚛️ Electron Configuration
                    </div>
                    <ul class="nav-menu" id="navMenu">
                        <li>
                            <a href="index.html" class="nav-link">
                                <i data-feather="home" style="width: 18px; height: 18px;"></i>
                                🏠 Beranda
                            </a>
                        </li>
                        <li>
                            <a href="materi.html" class="nav-link">
                                <i data-feather="book-open" style="width: 18px; height: 18px;"></i>
                                📘 Materi
                            </a>
                        </li>
                        <li>
                            <a href="games.html" class="nav-link">
                                <i data-feather="zap" style="width: 18px; height: 18px;"></i>
                                🎮 Games
                            </a>
                        </li>
                        <li>
                            <a href="latihan.html" class="nav-link">
                                <i data-feather="edit-3" style="width: 18px; height: 18px;"></i>
                                🧩 Latihan
                            </a>
                        </li>
                        <li>
                            <a href="diskusi.html" class="nav-link">
                                <i data-feather="message-circle" style="width: 18px; height: 18px;"></i>
                                💬 Diskusi
                            </a>
                        </li>
                    </ul>
                    <button class="mobile-menu-toggle" id="mobileMenuToggle">
                        <i data-feather="menu" style="width: 24px; height: 24px;"></i>
                    </button>
                </div>
            </nav>
        `;

    // Mobile menu toggle
    const mobileMenuToggle = this.shadowRoot.getElementById("mobileMenuToggle");
    const navMenu = this.shadowRoot.getElementById("navMenu");

    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Set active nav link based on current page
    const currentPath = window.location.pathname;
    const navLinks = this.shadowRoot.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPath.split("/").pop()) {
        link.classList.add("active");
      }
    });

    // Initialize feather icons
    setTimeout(() => {
      const icons = this.shadowRoot.querySelectorAll("[data-feather]");
      icons.forEach((icon) => {
        const iconName = icon.getAttribute("data-feather");
        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg.setAttribute("class", "feather feather-" + iconName);
        svg.setAttribute("width", icon.style.width || "24");
        svg.setAttribute("height", icon.style.height || "24");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");

        // Simple feather icon paths for common icons
        const paths = {
          home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
          "book-open":
            '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>',
          zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
          "edit-3":
            '<path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>',
          "message-circle":
            '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>',
          menu: '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>',
        };

        svg.innerHTML = paths[iconName] || "";
        icon.parentNode.replaceChild(svg, icon);
      });
    }, 100);
  }
}

customElements.define("custom-navbar", CustomNavbar);

