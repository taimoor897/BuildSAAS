export function extractAmount(text){

    const numbers =
    text.match(/[\d,]+/g);


    if(!numbers)
        return 0;


    const amounts =
    numbers.map(num =>
        Number(
          num.replace(/,/g,"")
        )
    );


    return Math.max(...amounts);

}