import "./preference.css";

var output = document.getElementById("demo");
export function Choice () {
    return (
        <>
        <fieldset className="legend">
            <legend>Preferences: </legend>
            <fieldset>
                <legend>Categories</legend>
                <input type="checkbox" id="one" name="one" value="arts_and_literature"></input>
                <label htmlFor="one">Arts & Literature</label><br></br>
                <input type="checkbox" id="two" name="two" value="film_and_tv"></input>
                <label htmlFor="two">Film & TV</label><br></br>
            </fieldset>
            <fieldset>
                <legend>Difficulty: </legend>
                <input type="checkbox" id="done" name="done" value="easy"></input>
                <label htmlFor="done">easy</label><br></br>
                <input type="checkbox" id="dtwo" name="dtwo" value="medium"></input>
                <label htmlFor="dtwo">medium</label><br></br>
                <input type="checkbox" id="dthree" name="dthree" value="hard"></input>
                <label htmlFor="dthree">hard</label><br></br>
            </fieldset>
            <fieldset>
                <legend>Number of questions: </legend>
                <div className="slidecontainer">
                    <input
                        type="range"
                        min={1}
                        max={20}
                        defaultValue={5}
                        className="slider"
                        id="myRange"
                    />
                    <p>
                        Value: <span id="demo" />
                    </p>
                </div>
            </fieldset>
            <fieldset>
                <legend>Tags: </legend>
                <input type="checkbox" id="tone" name="tone" value="birds"></input>
                    <label htmlFor="tone">birds</label><br></br>
                <input type="checkbox" id="ttwo" name="ttwo" value="beer"></input>
                    <label htmlFor="ttwo">beer</label><br></br>
            </fieldset>
            <button id="submitMe">Submit</button>
        </fieldset>
        </>
        );
    }

    export function Better () {
        var slider = document.getElementById("myRange");
        output.innerHTML = slider.value;
    
        slider.oninput = function() {
          output.innerHTML = this.value;
        }
    }

    // function getCat() {
    //     let cat = "";
    //     let first = document.getElementById("one");
    //     let second = document.getElementById("two");
    //     if(first.checked === true) {
    //         cat = cat + first.value;
    //     }
    //     if(second.checked === true) {
    //         if(cat !== "") {
    //             cat+=",";
    //         }
    //         cat+=second.value;
    //     }
    //     return cat;
    // }

    // function difficult() {
    //     let one = document.getElementById("done");
    //     let two = document.getElementById("dtwo");
    //     let three = document.getElementById("dthree");
    //     if(three.checked === true) {
    //         return "hard";
    //     } else if (two.checked === true) {
    //         return "medium";
    //     } else if (one.checked === true) {
    //         return "easy";
    //     } else {
    //         alert("Please fill the difficulty field as it is a required field !!");
    //     }
    // }

    // function getTag() {
    //     let one = document.getElementById("tone");
    //     let two = document.getElementById("ttwo");
    //     let ans = "";
    //     if(one.checked === true) {
    //         ans+=one.value;
    //     } else if (two.checked === true) {
    //         if(ans !== "") {
    //             ans+=",";
    //         }
    //         ans+=two.value;
    //     }
    //     return ans;
    // }

    export function sendApi() {
        var sel = document.getElementById("submitMe");
        sel.addEventListener("click", async () => {
            let cat = "";
            let first = document.getElementById("one");
            let second = document.getElementById("two");

            if(first.checked === true) {
                cat = cat + first.value;
            }

            if(second.checked === true) {
                if(cat !== "") {
                    cat+=",";
                }
                cat+=second.value;
            }

            let diff = "";
            let one = document.getElementById("done");
            let two = document.getElementById("dtwo");
            let three = document.getElementById("dthree");
            if(three.checked === true) {
                diff = "hard";
            } else if (two.checked === true) {
                diff = "medium";
            } else if (one.checked === true) {
                diff = "easy";
            } else {
                alert("Please fill the difficulty field as it is a required field !!");
            }
            let tone = document.getElementById("tone");
            let ttwo = document.getElementById("ttwo");
            let ans = "";
            if(tone.checked === true) {
                ans+=one.value;
            } else if (ttwo.checked === true) {
                if(ans !== "") {
                    ans+=",";
                }
                ans+=two.value;
            }
            await fetch(`https://the-trivia-api.com/api/questions?categories=${cat}&limit=${output.innerHTML}&difficulty=${diff}&tags=${ans}`)
            .then((response) => response.json())
            .then((user) => {
                console.log(user);
            })
        })
    }





    <div>
    <div id='circle' className='circle'></div>
    <div id='square' className='square'></div>
</div>