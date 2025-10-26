class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background: linear-gradient(135deg, #1e3a8a, #1e40af);
                    color: white;
                    padding: 3rem 2rem 2rem;
                    margin-top: 4rem;
                    position: relative;
                    overflow: hidden;
                }
                
                footer::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
                }
                
                .footer-content {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                    margin-bottom: 2rem;
                }
                
                .footer-section h3 {
                    color: #60a5fa;
                    margin-bottom: 1rem;
                    font-size: 1.2rem;
                }
                
                .footer-section p,
                .footer-section ul {
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.6;
                }
                
                .footer-section ul {
                    list-style: none;
                    padding: 0;
                }
                
                .footer-section ul li {
                    margin-bottom: 0.5rem;
                }
                
                .footer-section a {
                    color: rgba(255, 255, 255, 0.8);
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                
                .footer-section a:hover {
                    color: #60a5fa;
                }
                
                .footer-bottom {
                    text-align: center;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.6);
                }
                
                .social-links {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .social-link {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                
                .social-link:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-3px);
                }
            </style>
            <footer>
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Tentang</h3>
                        <p>Platform pembelajaran interaktif untuk memahami konfigurasi elektron berdasarkan kulit atom dengan cara yang menyenangkan.</p>
                        <div class="social-links">
                            <a href="https://github.com/Ipung1922" class="social-link">
                                <i data-feather="github" style="width: 20px; height: 20px;"></i>
                            </a>
                            <a href="https://www.instagram.com/irfan__k.r?igsh=MTdsb29taDF6MWhheg==" class="social-link">
                                <i data-feather="instagram" style="width: 20px; height: 20px;"></i>
                            </a>
                        </div>
                    </div>
                    <div class="footer-section">
                        <h3>Menu Cepat</h3>
                        <ul>
                            <li><a href="index.html">🏠 Beranda</a></li>
                            <li><a href="materi.html">📘 Materi</a></li>
                            <li><a href="games.html">🎮 Games</a></li>
                            <li><a href="latihan.html">🧩 Latihan</a></li>
                            <li><a href="diskusi.html">💬 Diskusi</a></li>
                        </ul>
                    </div>
            </footer>
        `;

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

        const paths = {
          github:
            '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>',
          twitter:
            '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>',
          instagram:
            '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>',
        };

        svg.innerHTML = paths[iconName] || "";
        icon.parentNode.replaceChild(svg, icon);
      });
    }, 100);
  }
}

customElements.define("custom-footer", CustomFooter);
