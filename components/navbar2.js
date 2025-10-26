class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
  <style>
  * {
    box-sizing: border-box;
  }

<style>
  * {
    box-sizing: border-box;
  }

  nav {
    background: linear-gradient(135deg, rgba(30, 64, 175, 0.95), rgba(59, 130, 246, 0.95));
    backdrop-filter: blur(10px);
    padding: 1rem 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    position: fixed; /* ✅ selalu di atas layar */
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  }

  .nav-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
  }

  .logo {
    color: white;
    font-weight: 700;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
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
      transition: left 0.3s ease;
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
          <div class="logo">⚛️ ElektronKulit</div>
          <ul class="nav-menu" id="navMenu">
            <li><a href="index.html" class="nav-link">🏠 Beranda</a></li>
            <li><a href="materi.html" class="nav-link">📘 Materi</a></li>
            <li><a href="games.html" class="nav-link">🎮 Games</a></li>
            <li><a href="latihan.html" class="nav-link">🧩 Latihan</a></li>
            <li><a href="diskusi.html" class="nav-link">💬 Diskusi</a></li>
          </ul>
          <button class="mobile-menu-toggle" id="mobileMenuToggle">☰</button>
        </div>
      </nav>
    `;

    // Mobile toggle
    const toggle = this.shadowRoot.getElementById("mobileMenuToggle");
    const navMenu = this.shadowRoot.getElementById("navMenu");
    toggle.addEventListener("click", () => navMenu.classList.toggle("active"));

    // Set active link
    const current = window.location.pathname.split("/").pop();
    this.shadowRoot.querySelectorAll(".nav-link").forEach((link) => {
      if (link.getAttribute("href") === current) link.classList.add("active");
    });
  }
}

customElements.define("custom-navbar", CustomNavbar);
