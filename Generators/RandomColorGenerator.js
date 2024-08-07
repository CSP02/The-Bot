function GenerateColor() {
    const str = ["#"];

    for (let i = 0; i < 6; i++) {
        const numOrAl = Math.round(Math.random());

        switch (numOrAl) {
            case 0: {
                const letters = ["A", "B", "C", "D", "E", "F"];
                const ranIndex = parseInt((Math.random() * 10) / 2);

                str.push(letters[ranIndex]);
                break;
            }
            case 1: {
                str.push(parseInt(Math.random() * 10));
                break;
            }
        }
    }

    return str.join("");
}

module.exports = { GenerateColor }