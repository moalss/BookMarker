/* Start Elements */
let clearBtnError=document.querySelector(".clearBtnError");
let submit=document.querySelector(".submitBtn");
let clearBtn=document.querySelector(".clearBtn");
let layout=document.querySelector(".layout");
let close=document.querySelector(".fa-circle-xmark");
let alertContet = document.querySelector(" .alertWindow .content")
let inputSiteName=document.querySelector("#siteName");
let inputSiteUrl=document.querySelector("#siteUrl");
let checkName=document.querySelector(".checkName");
let checkUrl=document.querySelector(".checkUrl");

let removeBtn;
let allRemoveBtn;
let allSite="allSite"
let siteFeld=[];

/* End Elements */

/* Start Alert Window */
close.addEventListener("mouseover", function(){
    close.style.color="red";
 
})
close.addEventListener("mouseout", function(){
    close.style.color="black";
})


close.addEventListener("click",function (e){
e.stopPropagation();
    layout.classList.replace("d-flex" , "d-none");
    
    });

layout.addEventListener("click",function (){
    layout.classList.replace("d-flex" , "d-none");
    
    });

alertContet.addEventListener("click",function (e){
e.stopPropagation();
layout.classList.replace("d-none" , "d-flex");
});

/* End Alert Window */




/* Add Event */
submit.addEventListener("click",function (){
    if((inputSiteName.value===""&&inputSiteUrl.value===""  )){
        layout.classList.replace("d-none" , "d-flex");

    }else{
        if(checkNameInput()&&checkUrlInput() &&inputSiteName.value!==""&&inputSiteUrl.value!=="" ){
            
            addSite();
            clearValidation();
        }
        
        
    }
    });



inputSiteName.addEventListener("input", function(){
    if(checkNameInput()){
        checkName.innerHTML=`<span><i class="fa-solid fa-check"></i></span>`;
        inputSiteName.classList.add("is-valid" );
        inputSiteName.classList.replace("is-invalid","is-valid" );
    }else{
        checkName.innerHTML=`<span><i class="fa-solid fa-circle-xmark"></i></span>`;
        inputSiteName.classList.add("is-invalid" );
        inputSiteName.classList.replace("is-valid","is-invalid" );
    };
});
   
inputSiteUrl.addEventListener("input", function(){
    if(checkUrlInput()){
        checkUrl.innerHTML=`<span><i class="fa-solid fa-check"></i></span>`;
        inputSiteUrl.classList.add("is-valid" );
        inputSiteUrl.classList.replace("is-invalid","is-valid" );
        
    }else{
        checkUrl.innerHTML=`<span><i class="fa-solid fa-circle-xmark"></i></span>`;
        inputSiteUrl.classList.add("is-invalid" );
        inputSiteUrl.classList.replace("is-valid","is-invalid" );
    };
});

/* clear */

   /* Clear the Table */
   clearBtn.addEventListener("click",function(){
      console.log(checkTableIsEmpty());
    if(checkTableIsEmpty()){
        deletTable();
      checkTableIsEmpty();
    }
   
   }  );





/* LocalStorage */
/*Get from LocalStorage */
if(localStorage.getItem(allSite)){
siteFeld=JSON.parse(localStorage.getItem(allSite));
showSite(siteFeld);
}
/*Set to LocalStorage */
function setToLocalStorage(){
    localStorage.setItem(allSite,JSON.stringify(siteFeld));
}

/*clear Validation */

function clearValidation(){
    inputSiteUrl.classList.remove("is-valid");
    inputSiteName.classList.remove("is-valid");
    checkUrl.classList.add("d-none");
    checkName.classList.add("d-none");
}
/* Add Site */

function addSite(){
    let site={
        name:inputSiteName.value ,
        url:inputSiteUrl.value,
    }
siteFeld.push(site);
setToLocalStorage();
showSite(siteFeld);
clearForme();
checkTableIsEmpty();
// console.log(allRemoveBtn=Array.from(document.querySelectorAll(".removeBtn")));
// console.log(removeBtn=document.querySelector(".removeBtn"));
}
/* Remove Event  */
// function removeButton(){
//         if(allRemoveBtn.length>0){
//           allRemoveBtn.forEach((e,i) => {
//             e.addEventListener("click", function(){
//               deleteSite(i);
//               });
            
//           });
//         }

// }
// removeBtn.addEventListener("click",removeButton);
// /* Finde Index */
// function findeIndex(feld,target){
//     let index;
//     for(let i=0;i<feld.length;i++){
//              index=feld.indexOf(target);
//     }
//     return index;
// }


/* Show Site */

function showSite(feld){
    let blackBox="";
    
    for(let i=0; i<feld.length;i++){
    blackBox+=`<tr> 
    <td>
     ${(i+1)}
    </td>
    <td class="text-capitalize"> 
    ${feld[i].name}
    </td>
    <td> 
    <a class="btn btn-success " onclick="visit(${i})" href="${feld[i].url}"target="_blank"> <i class="fa-solid fa-eye"></i>Visit</a>
    </td>
    <td> 
    <button class=" btn btn-danger removeBtn" onclick="deleteSite(${i})" > <i class="fa-solid fa-trash"></i>Delete</button>
    </td>
    </tr>`
    }
    document.querySelector("table tbody").innerHTML=blackBox;
}

/* Clear Site */
function clearForme(){
    inputSiteName.value="";
    inputSiteUrl.value="";

}

// function deleteSite(target){

//     if(findeIndex(allRemoveBtn,target)){
//         siteFeld.splice(findeIndex(allRemoveBtn,target),1);
//         setToLocalStorage();
//         showSite(siteFeld);
//     }
// }

function deletTable(){
    siteFeld.splice(0, siteFeld.length);
    setToLocalStorage();
    showSite(siteFeld);

}
function deleteSite(index){ 
        siteFeld.splice(index,1);
        setToLocalStorage();
        showSite(siteFeld);
}

/* Validation */

function checkNameInput(){
    let regex=/^[a-z]{3,}$/;
let erg=regex.test(inputSiteName.value);

 return erg;
}

function checkUrlInput(){
    let regex=/^(https?:\/\/www.[a-z]{2,}\.[a-z]{2,})$/;
let erg=regex.test(inputSiteUrl.value);

 return erg;
}

function checkTableIsEmpty(){
    if(siteFeld.length===0){
        clearBtn.classList.replace("a","disabled");
        return false;
    }else{
        
        clearBtn.classList.replace("disabled","a");
        return true;
    
    }
}

