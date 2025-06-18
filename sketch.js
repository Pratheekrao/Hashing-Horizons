let searchedIndex = null
let n=1;
let cond = false;
let k=0;
const counter = new Map()
function clearAndRedraw() {
    clear()
    redraw()
}

function modalPopUp(error) {
    const modelBody = document.querySelector('#model-body')
    modelBody.querySelector('p').innerText = error
    $('#errorModel').modal()
}

function setup() {
    createCanvas(displayWidth, windowHeight)
    linear = new LinearHashing()

    SizeTableInput = createInput()
    SizeTableInput.position(25, 120)
    SizeTableInput.attribute('placeholder', 'Size of table')
    SizeTableInput.size(150,35)
    SizeTableButton = createButton('Resize')
    SizeTableButton.position(SizeTableInput.x + SizeTableInput.width +3, SizeTableInput.y )
    SizeTableButton.addClass('btn btn-primary')
    // SizeTableButton.size(75,30)
    SizeTableButton.mousePressed(()=>{
        linear.tableSize = SizeTableInput.value();
        n=linear.tableSize;
        linear.choice = mySelect.value();
        linear.hash = mySelectfun.selected();
        clearAndRedraw();
    })
    
    mySelectfun = createSelect();
//     textSize(20);
//    text("Hash Function: ",SizeTableInput.x +  SizeTableInput.width + 100 , SizeTableInput.y -58)
    mySelectfun.position(SizeTableInput.x +  SizeTableInput.width + 100 , SizeTableInput.y);
    // Add color options.
    mySelectfun.option('Division Method ');
    mySelectfun.option('Folding Method ');
    mySelectfun.selected('Division Method ');
    linear.hash = mySelectfun.selected();

    insertTableInput = createInput()
    insertTableInput.position(mySelectfun.x +  mySelectfun.width + 150 , mySelectfun.y )
    insertTableInput.attribute('placeholder', 'Insert Key')
    insertTableInput.size(150,35)
    insertTableButton = createButton('Insert')
    insertTableButton.position(insertTableInput.x + insertTableInput.width + 3, insertTableInput.y - 1)
    insertTableButton.addClass('btn btn-primary')
    // insertTableButton.size(75,30)
    insertTableButton.mousePressed(() => {
        searchedIndex = null
        const key = insertTableInput.value()
         k = insertTableInput.value()
        if (key) {
            try {
                if(linear.hashTable[key%n]!=undefined)
                    cond=true;
                linear.insert(key)
                console.log(`${key} inserted!`)
            } catch (error) {
                console.error(error)
                modalPopUp(error)
            }
            insertTableInput.value('')
        }
        clearAndRedraw()
    })
    searchTableInput = createInput()
    searchTableInput.position(insertTableInput.x  + insertTableInput.width + 100, insertTableInput.y)
    searchTableInput.attribute('placeholder', 'Search Key')
    searchTableInput.size(150,35)
    searchTableButton = createButton('Search')
    searchTableButton.position(searchTableInput.x + searchTableInput.width + 3, searchTableInput.y - 1)
    searchTableButton.addClass('btn btn-primary')
    // searchTableButton.size(75,30)
    searchTableButton.mousePressed(() => {
        searchedIndex = null
        const key = searchTableInput.value()
        if (key) {
            try {
                searchedIndex = linear.search(key)
            } catch (error) {
                console.error(error)
                modalPopUp(error)
            }
            searchTableInput.value('')
        }
        clearAndRedraw()
    })

    deleteTableInput = createInput()
    deleteTableInput.position(searchTableInput.x  + searchTableInput.width + 100, searchTableInput.y)
    deleteTableInput.attribute('placeholder', 'Delete Key')
    deleteTableInput.size(150,35)
    deleteTableButton = createButton('Delete')
    deleteTableButton.position(deleteTableInput.x + deleteTableInput.width + 3, deleteTableInput.y - 1)
    deleteTableButton.addClass('btn btn-primary')
    // deleteTableButton.size(75,30)
    deleteTableButton.mousePressed(() => {
        searchedIndex = null
        const key = deleteTableInput.value()
        if (key) {
            try {
                
                linear.delete(key)
                console.log(`${key} deleted`)
            } catch (error) {
                console.error(error)
                modalPopUp(error)
            }
            deleteTableInput.value('')
        }
        clearAndRedraw()
    })
   
    mySelect = createSelect();
  mySelect.position(deleteTableInput.x  + deleteTableInput.width + 100, deleteTableInput.y);
  // Add color options.
  mySelect.option('Linear Probing ');
  mySelect.option('Quadratic Probing ');
  mySelect.selected('Linear Probing ');
  linear.choice = mySelect.selected();
    textAlign(CENTER, CENTER)
    textSize(30)
    ellipseMode(CENTER)
    strokeWeight(2)
    noLoop()
}

function draw() {
    
    // let pg = createGraphics(windowWidth,windowHeight);
    for (let i = 0; i < linear.tableSize; ++i) {
        
        let key = linear.hashTable[i]
        console.log(key)
        if (key === null) {
            key = "DEL"
            fill('orange')
        }
        if(n<16)
        c = getCirclePosition(i)
        else if(n>=16){
        c = getCirclePosition1(i);
        }
        if (key !== undefined ){
            stroke('black')
        }
        if (searchedIndex === i)
            stroke('blue')
        fill('#d4c9c9');
        square(c.x-35, c.y-40,70)
        
        if (key !== undefined) {
            if (key == "DEL")
                fill(255)
            else if (i === searchedIndex){
                fill('white')
                stroke('black')
                rect(insertTableInput.x+120,insertTableInput.y-7,370,70,10)
                fill('black')
                text(key + ' found at index ' + i,insertTableInput.x+300,insertTableInput.y+23 )
                fill('blue')
                stroke('blue')
            }
             
            else{
                fill('black')
            text(key, c.x, c.y)
            fill('white')
            stroke('black')
           if(!counter.get(i)){
            rect(insertTableInput.x+120,insertTableInput.y-7,370,70,10)
            fill('black')
            console.log("hihi")
            if(linear.hash=='Division Method '){   
                text(key + ' mod(' + n + ') =' + key%n,insertTableInput.x+300,insertTableInput.y+13 )
            if(!cond)
                text('Key inserted at index '+  i,insertTableInput.x+300,insertTableInput.y+43)
            else{
                text('Collision!! inserted at '+  i,insertTableInput.x+300,insertTableInput.y+43)
                cond=false;
            }
        }else
            text(key + ' inserted at index '+  i,insertTableInput.x+300,insertTableInput.y+23)
            counter.set(i, 500);

        }
        if(linear.choice=='Linear Probing '){
         if((key!=k && key%linear.tableSize===k%linear.tableSize)||i==k%linear.tableSize){
            stroke('black')
            fill('gray')
            circle(c.x,c.y-4,56)
            fill('black')
            text(key, c.x, c.y)
        }
    }
        else{
         if(key!==k && key%linear.tableSize===k%linear.tableSize){
            stroke('black')
            fill('gray')
            circle(c.x,c.y-4,56)
            fill('black')
            text(key, c.x, c.y)
        }
    }
            fill(255)
            stroke('black')
        }
    }
        fill('white')
        text('['+i+']',c.x,c.y+60)
        
    }
}

function getCirclePosition(index) {
    return Object.freeze({
        x: SizeTableInput.x + 50 + (displayWidth / linear.tableSize) * index,
        // y: deleteTableInput.y + deleteTableInput.height + 50
        y: windowHeight / 3.0 
    })
}
function getCirclePosition1(index) {
    let j=0;
    i=index%21;

    if(index<21)
        j=0;
    else if(index>=21 && index<21*2){
        j=150;
    }
    else if(index>=21*2 && index<21*3)
        j=300;
    else if(index>=21*3 && index<21*4)
        j=450; 
    else if(index>=21*4 && index<21*5)
        j=600;
    else if(index>=21*5 && index<21*6)
        j=750;
    return Object.freeze({
        x: SizeTableInput.x + 70*i +50,
        y: windowHeight / 3.0 + j
    })
}