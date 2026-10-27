class NavBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
              <div id="topBar">
            <div id="mainLogo" class="topBarItems">
                <a href="/">
                    <img src="/topBar-logo.svg" alt="returnXER0">
                </a>
            </div>
            <div id="button1" class="topBarItems">
                <a href="/LetsConnect/">
                    <p class="highlight-white">
                        <span class="highlight-green">Lets connect</span><br>
                        <span class="hiddenTopText">tell us what's<br>in your mind</span>
                    </p>

                </a>
            </div>
            <div id="button2" class="topBarItems">
                <a href="/showcase/">
                    <p class="highlight-white">
                        <span class="highlight-green">Showcase</span><br>
                        <span class="hiddenTopText">see what exactly<br>we can do</span>
                    </p>
                </a>
            </div>
            <div id="button3" class="topBarItems">
                <a href="/about/">
                    <p class="highlight-white">
                        <span class="highlight-green">About Us</span><br>
                        <span class="hiddenTopText">get to know<br>more about us</span>
                    </p>
                </a>
            </div>
            <div id="button4" class="topBarItems">                
                <p class="highlight-white">
                    <span class="highlight-green">ooo</span><br>
                    <a href="/showcase/"><span class="hiddenMore">Pricing</span></a><br>
                   <a href="/articles/"><span class="hiddenMore">Articles</span></a><br>
                </p>            
            </div>
        </div>
        `;
    }
}

customElements.define("rx-navbar", NavBar);