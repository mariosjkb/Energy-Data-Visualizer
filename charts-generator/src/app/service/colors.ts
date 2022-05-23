// MARIOS IAKOVIDIS
// Typescript file that maps a country to a certian color for presentation purposes. It is also set as Provides in the app-module.ts

export class Colors {
    
    // initialize Map
    coloring: Map<string,string> = new Map<string,string>();

    // fill map with the color values for each country
    constructor() {
        this.coloring.set("Austria","DarkRed")
        this.coloring.set("Belgium","Orange");
        this.coloring.set("Bulgaria","LightGreen");
        this.coloring.set("Croatia","Fuchsia");
        this.coloring.set("Cyprus","GoldenRod");
        this.coloring.set("Czech Republic","MediumVioletRed");
        this.coloring.set("Denmark","Red");
        this.coloring.set("Estonia","DarkSlateBlue");
        this.coloring.set("Finland","DodgerBlue");
        this.coloring.set("France","Blue");
        this.coloring.set("Germany","Gold");
        this.coloring.set("Greece","Turquoise");
        this.coloring.set("Hungary","SeaGreen");
        this.coloring.set("Ireland","Lime");
        this.coloring.set("Italy","LightSeaGreen");
        this.coloring.set("Latvia","Maroon");
        this.coloring.set("Lithuania","Green");
        this.coloring.set("Luxembourg","CornflowerBlue");
        this.coloring.set("Malta","Brown");
        this.coloring.set("Netherlands","OrangeRed");
        this.coloring.set("Poland","IndianRed");
        this.coloring.set("Portugal","Olive");
        this.coloring.set("Romania","Yellow");
        this.coloring.set("Slovak Republic","DarkGray");
        this.coloring.set("Slovenia","Chartreuse");
        this.coloring.set("Spain","Crimson");
        this.coloring.set("Sweden","Indigo");
    }
}