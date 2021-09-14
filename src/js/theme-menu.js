
export default class MenuSwitch {
    constructor(){
        
        // dom caching 
        this._body = document.getElementsByTagName("body")[0];
        this._darkThemeBtn = this._body.querySelector(".toggle__menu-input--dark-theme");
        this._lightThemeBtn = this._body.querySelector(".toggle__menu-input--light-theme");
        this._violetThemeBtn = this._body.querySelector(".toggle__menu-input--violet-theme");
        this._toggleCircle = this._body.querySelector(".toggle__menu-circle");
        // render 
        this.render()

    }

    // bindint events
    bindEvents(){


        // theming 
        this._darkThemeBtn.addEventListener("click",()=> { this.changeTheme("dark-theme")})
        this._lightThemeBtn.addEventListener("click",()=> { this.changeTheme("light-theme")})
        this._violetThemeBtn.addEventListener("click",()=> { this.changeTheme("violet-theme")})
        

    }

    // rendering 
    render(){
        this.bindEvents();
        this.loadTheme();
        this.checkUserDefaultTheme();
    }

    // setting the theme accordingly to user preference
    loadTheme(){
        const preferenceTheme = localStorage.getItem("preference-theme") || '';
        const theme = localStorage.getItem("theme") || "";
        preferenceTheme ? this.changeTheme(preferenceTheme) : "";
        theme ? this.changeTheme(theme) : "";

    }

    /**
     * prograssive enhancement 
     * adjusting the thme to user's system level theme setting
     */
    checkUserDefaultTheme(){
        const lightTheme = window.matchMedia("preference-color-scheme:light;");
        localStorage.setItem("preference-theme","light-theme");
    }

    // change theme and locate toggle correctly 
    changeTheme(theme){
        if(theme === "dark-theme"){
            this._body.classList = theme;
            this._toggleCircle.classList = "toggle__menu-circle";
            localStorage.setItem("theme","dark-theme");

            // updating state 
            this._darkThemeBtn.setAttribute("aria-checked","true");
            this._lightThemeBtn.setAttribute("aria-checked","false");
            this._violetThemeBtn.setAttribute("aria-checked","false");

        }else if (theme === "light-theme"){
            this._body.classList = theme;
            this._toggleCircle.classList = "toggle__menu-circle toggle__menu-circle--light-theme";
            localStorage.setItem("theme","light-theme");


            this._darkThemeBtn.setAttribute("aria-checked","false");
            this._lightThemeBtn.setAttribute("aria-checked","true");
            this._violetThemeBtn.setAttribute("aria-checked","false");

        }else if(theme === "violet-theme"){
            this._body.classList = theme;
            this._toggleCircle.classList = "toggle__menu-circle toggle__menu-circle--violet-theme";
            localStorage.setItem("theme","violet-theme");

            this._darkThemeBtn.setAttribute("aria-checked","false");
            this._lightThemeBtn.setAttribute("aria-checked","false");
            this._violetThemeBtn.setAttribute("aria-checked","true");
        }
    }
}