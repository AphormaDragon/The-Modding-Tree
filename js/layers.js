addLayer("a", {
    name: "a", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "A points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.42, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade(this.layer, 11)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effBase(){
        base = new Decimal(1.1)
        if(hasUpgrade(this.layer, 12)) base = base.add(0.01)
        return base
    },
    effect() {
        eff = Decimal.pow(this.effBase(), player.a.points/5)
        return eff
    },
    effectDescription(){
        return "which are multiplying your point production by "+format(tmp.a.effect)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for A points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        rows: 1,
        cols: 4,
        11: {
            title: "Upgrades, yeah!",
            description: "Multiply A points gain by 2",
            cost: new Decimal(5)
        },
        12: {
            title: "More upgrades!",
            description: "Effect of A points is better",
            cost: new Decimal(10)
        },
        13: {
            title: "Challenging!"
        },
        14: {
            title: "More letters"
        }
    }
})