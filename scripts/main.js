// #region 선택자를 먼저 작성
    const mainTabArea = document.querySelector(".tab-main"); //탭버튼ul
    const mainTabBtn = mainTabArea.querySelectorAll("li"); //탭버튼li
    const productsScroll = document.querySelector(".scrollbar"); //스크롤바
// #endregion

// #region — 메뉴리스트 카테고리분류 매핑하기 위한 객체 ——————————   
    const subCategoryName = {
        coffee: "커피", 
        coldbrew: "콜드브루", 
        frappuccino: "프라푸치노", 
        blended: "블렌디드", 
        bread: "브레드", 
        cake: "케이크", 
        sandwich: "샌드위치"
    };

    const mainCategoryName = {
        new: "시즌메뉴", 
        noncoffee: "논커피", 
        fizzio: "피지오", 
        tea: "티"
    };
// #endregion

// #region — 옵션 버튼 라벨을 매핑하기 위한 객체 ——————————   
    const optionBtnName = {
        size: {Tall: "TALL", Grande: "GRANDE", Venti: "VENTI"}, 
        shot: {없음: "기본", 연하게: "연하게", "+1": "1샷", "+2": "2샷"}, 
        topping: {휘핑크림: "있음", 바닐라시럽: "바닐라", 헤이즐시럽: "헤이즐", 캬라멜드리즐: "캬라멜", 초코드리즐: "초코"}, 
        heat: {"따뜻하게 데움": "데우기", "데우지 않음": "데우지 않음" }
    };
// #endregion
// #region — 옵션 버튼 라벨을 매핑하기 위한 객체 ——————————   

    const cartOptionBtnName = {
        iceb: {보통: "얼음", 적게: "얼음↓", 많게: "얼음↑"},
        size: {Tall: "T", Grande: "G", Venti: "V"}, 
        shot: {없음: "기본", 연하게: "연하게", "+1": "1샷", "+2": "2샷"}, 
        topping: {휘핑크림: "휘핑", 바닐라시럽: "바닐라", 헤이즐시럽: "헤이즐", 캬라멜드리즐: "캬라멜", 초코드리즐: "초코"}, 
        heat: {"따뜻하게 데움": "데우기", "데우지 않음": "데우지 않음" },
        fork: {필요없음: "포크x", 필요함: "포크o"},
        candle: {필요없음: "초x", 필요함: "초o"}
    };
// #endregion
// #region — 옵션 라벨명 맵핑 객체 —————————— 
    const optionName = {
        temper: "종류", 
        iceb: "얼음양", 
        size: "용량", 
        been: "원두", 
        shot: "샷추가", 
        topping: "토핑", 
        heat: "워밍옵션", 
        fork: "포크추가", 
        candle: "생일초"
    };
// #endregion

// #region — 옵션 추가 금액을 매핑할 객체 —————————— 
    const optionPrice = {
        size: {Tall: 0, Grande: 600, Venti: 1400}, 
        been: {시그니처: 0, 블론드: 300, 디카페인: 300}, 
        shot: {없음: 0, 연하게: 0, "+1": 500, "+2": 1000}, 
        whipping: {없음: 0, 휘핑크림: 800}, 
        syrup: {없음: 0, 바닐라시럽: 800, 헤이즐시럽: 800}, 
        drizzle: {없음: 0, 캬라멜드리즐: 800, 초코드리즐: 800}
    }
    // console.log(optionPrice.temper.ice);
    // console.log(optionPrice["temper"]["ice"]);
// #endregion

// #region — 🅼🅰🅸🅽 카테고리 —————————— 
    mainTabBtn.forEach(function(btn){
        btn.addEventListener("click", function(){
            const mainName = this.dataset.main;
            productsScroll.scrollTop = 0;

            mainTabBtn.forEach(function(b){
                b.classList.remove("main-on");
            });
            this.classList.add("main-on");

            const mainFiler = menus.filter(function(item){
                if(mainName == "new"){
                    return item.new == true;
                }
                return item.category == mainName;
            });

            let subArr = [];
            if(mainName != "new"){
                subArr = makeSubCate(mainFiler);
            }

            const productArr = makeFinalCate(mainName);
            renderProductList(productArr, mainName);
            renderSubCate(subArr, mainName);
        });
    });
// #endregion

// #region — 🅂🅄🄱 카테고리 배열을 생각하는 함수 —————————— 
    function makeSubCate(arr){
        const subArr = [];
        arr.forEach(function(item){
            if(item.subCategory && !subArr.includes(item.subCategory)){
                subArr.push(item.subCategory);
            }
        })

        // console.log("서브 카테고리 배열", subCate);
        return subArr;
    }
// #endregion

// #region — 🅂🅄🄱 카테고리를 화면에 그리는 함수 —————————— 
    function renderSubCate(arr, mainName){
        const subTabArea = document.querySelector(".tab-sub");
        let html = "";

        arr.forEach(function(sub, inx){
            let subClass = "";
            if(inx == 0) subClass = "";

            const subLabel = subCategoryName[sub] || sub;

            html += `<li data-sub= "${sub}" class= "${subClass}">
                        <button class= "caption-subInfo">${subLabel}</button>
                    </li>`;
        });

        subTabArea.innerHTML = html;

        const subTabBtn = subTabArea.querySelectorAll("li");
        subTabBtn.forEach(function(btn){
            btn.addEventListener("click", function(){
                const subName = this.dataset.sub;

                // const btnOn = this.classList.contains("sub-on");

                // // 이미 켜져 있던 버튼을 다시 누른 경우 -> 끄기
                // if(btnOn){
                //     this.classList.remove("sub-on");

                //     // 서브 선택 해제됐을 때-> 메인카테고리 전체 상품 다시 출력
                //     const productArr = makeFinalCate(mainName);
                //     renderProductList(productArr);
                //     // 리턴을 넣어야 온오프 적용이 됨.. 이유 물어보기!
                //     return;
                // }

                subTabBtn.forEach(function(b){
                    b.classList.remove("sub-on");
                });
                this.classList.add("sub-on");

                const targetGroup = productArea.querySelector(`.product-group[data-sub= "${subName}"]`);

                if(targetGroup){
                    productsScroll.scrollTo({
                        top: targetGroup.offsetTop - 100, 
                        behavior: "smooth"
                    });
                }


            });
        });
    }
// #endregion

// #region — 🅼🅰🅸🅽+🅂🅄🄱 카테고리 최종 필터를 생성하는 함수 —————————— 
    function makeFinalCate(mainName, subName){
        
        if(mainName == "best"){
            return [...menus].sort(function(a, b){
                return b.sales - a.sales;
            }).slice(0, 5);
        }

        const finalFilter = menus.filter(function(item){
            if(mainName == "new"){
                return item.new == true; 
            }

            if(!subName){
                return item.category == mainName;
            }

            return item.category == mainName && item.subCategory == subName;
        });

        // 서브카테고리 기준 정렬
        finalFilter.sort(function(a, b){
            const aSub = a.subCategory || "";
            const bSub = b.subCategory || "";
            return aSub.localeCompare(bSub);
        });

        return finalFilter;
    }
// #endregion

// #region — 상품리스트 화면에 출력하는 함수 —————————— 
    const productArea = document.querySelector(".product-list");

    function renderProductList(productArr, mainName){
        let html = "";

        const hasSubCategory = productArr.some(function(item){
            return item.subCategory;
        });

        // 시즌메뉴는 그룹 제목 없이 그냥 출력
        if(!hasSubCategory || mainName == "new"){
            // 시즌메뉴는 제목 없이 출력
            if(mainName == "new"){
                
                html += `
                    <div class= "product-group no-sub-group" data-sub= "${mainName}">
                    <p class= "group-title content-menu-name"></p>
                    <ul class= "group-list no-group">`;

                productArr.forEach(function(item){
                    let imgSrc = `images/menu/${item.category}/${item.subCategory}/${item.img}`;
                    if(item.subCategory == null){
                        imgSrc = `images/menu/${item.category}/${item.img}`;
                    }

                    html += `
                        <li class= "item" data-id= "${item.id}">
                            <div class= "opt-info">
                                <div class= "img-mask"><img src= "${imgSrc}" alt= "${item.name}"></div>
                                <dl>
                                    <dt class= "content-menu-name">${item.name}</dt>
                                    <dd class= "price content-price">${item.price.toLocaleString()+"원"}</dd>
                                    <dd class= "acntAllergy">
                                        <div class= "allergy-mask caption-subInfo">알레르기: ${item.acntAllergy}</div>
                                    </dd>
                                </dl>
                            </div>
                        </li>
                    `;
                });

                html += `</ul></div>`;
                productArea.innerHTML = html;
                return;
            }

            // 서브카테고리 없는 일반 카테고리는 메인카테고리명 표시
            const mainLabel = mainCategoryName[mainName] || mainName;

            html += `
                <div class= "product-group no-sub-group" data-sub= "${mainName}">
                    <p class= "group-title content-menu-name">· ${mainLabel}</p>
                    <ul class= "group-list">
            `;

            productArr.forEach(function(item){
                let imgSrc = `images/menu/${item.category}/${item.subCategory}/${item.img}`;
                if(item.subCategory == null){
                    imgSrc = `images/menu/${item.category}/${item.img}`;
                }

                html += `
                    <li class= "item" data-id= "${item.id}">
                        <div class= "opt-info">
                            <div class= "img-mask"><img src= "${imgSrc}" alt= "${item.name}"></div>
                            <dl>
                                <dt class= "content-menu-name">${item.name}</dt>
                                <dd class= "price content-price">${item.price.toLocaleString()+"원"}</dd>
                                <dd class= "acntAllergy">
                                    <div class= "allergy-mask caption-subInfo">알레르기: ${item.acntAllergy}</div>
                                </dd>
                            </dl>
                        </div>
                    </li>
                `;
            });

            html += `</ul></div>`;
            productArea.innerHTML = html;
            return;
        }

        let currentSub = "";

        productArr.forEach(function(item){
            let imgSrc = `images/menu/${item.category}/${item.subCategory}/${item.img}`;
            if(item.subCategory == null){
                imgSrc = `images/menu/${item.category}/${item.img}`;
            }

            if(currentSub !== item.subCategory){
                if(currentSub !== ""){
                    html += `</ul></div>`;
                }

                currentSub = item.subCategory;
                const subLabel = subCategoryName[currentSub] || currentSub;

                html += `
                    <div class= "product-group" data-sub= "${currentSub}">
                        <p class= "group-title content-menu-name">· ${subLabel}</p>
                        <ul class= "group-list">
                `;
            }

            html += `
                <li class= "item" data-id= "${item.id}">
                    <div class= "opt-info">
                        <div class= "img-mask"><img src= "${imgSrc}" alt= "${item.name}"></div>
                        <dl>
                            <dt class= "content-menu-name">${item.name}</dt>
                            <dd class= "price content-price">${item.price.toLocaleString()+"원"}</dd>
                            <dd class= "acntAllergy">
                                <div class= "allergy-mask caption-subInfo"> 알레르기: ${item.acntAllergy} </div>
                            </dd>
                        </dl>
                    </div>
                </li>
            `;
        });

        if(currentSub !== ""){
            html += `</ul></div>`;
        }

        productArea.innerHTML = html;
    }
// #endregion

// #region 상품리스트(버튼)를 클릭하면, 옵션을 그리는 함수 - 이벤트 위임
    let choiceProduct = "";
    const cartArr = [];
    productArea.addEventListener("click", function(e){
        // 선택한 상품과 일치하는 데이터 찾기 (중복되지 않는 key = 상품의 id)

        const li = e.target.closest("li"); // 가까운 부모, 조상을 찾는 선택자
        if(!li) return;
        // console.log(e.target);  // 이벤트가 실제로 발생한 요소를 찾음

        // 선택한 상품과 일치하는 데이터 찾기 (중복되지 않는 key = 상품의 id)
        // fliter(): 여러개를 한번에 찾을 때 / find(): 일치하는 것 하나만 찾음
        choiceProduct = menus.find(function(item){
            return li.dataset.id == item.id;
        });

        // 옵션이 없을 때 - 장바구니에 바로 담기
        if(!choiceProduct.option){
            // 일치하는 상품이 cartArr에 있는지 확인
            const existItem = cartArr.find(function(item){
                // 변수를 저장해 = cartArr라는 배열을 순환하면서 콜백함수의 조건에 만족하는 첫번째 배열요소를 반환해.
                return item.id == choiceProduct.id;
                // 아이템(옵션)의 아이디가 메뉴 아이디와 일치하면
            });

            // 같은 id의 상품이 있으면 객체로 만들지 않음
            if(existItem){
                msgAlert("선택한 상품은 이미 장바구니에 있어요.");
                return;
            }

            const cartItem = {
                id: choiceProduct.id, 
                name: choiceProduct.name, 
                price: choiceProduct.price, 
                img: choiceProduct.img, 
                category: choiceProduct.category, 
                subCategory: choiceProduct.subCategory, 
                qty: 1, 
                extraPrice: 0, 
                options: {}
            }

            cartArr.push(cartItem);
            renderCartList();
            // console.log("옵션이 없을 때", cartArr);
            return;
        }
        // console.log("다음에 할 일");

        // 옵션이 있을 때
        renderProductOption(choiceProduct);
    });
// #endregion

// #region — 선택한 상품의 옵션 영역을 렌더링 하는 함수 —————————— 
    const options = document.querySelector("#options");
    const optionList = options.querySelector(".option-list");

    const temperBeen = options.querySelector(".temper-been");
    const sizeShot = options.querySelector(".size-shot");
    const whippingDrizzle = options.querySelector(".whipping-drizzle");
    const syrupIceb = options.querySelector(".syrup-iceb");

    function renderProductOption(choiceProduct){
        if(!choiceProduct.option) return "옵션없으니 장바구니로 바로가기" //필요없음
        // console.log("선택된 상품", choiceProduct);
        const productInfo = options.querySelector(".product-info");
        // 옵션창 보이게(.show)
        options.classList.add("show")
        
        // 이미지 서브 카테고리 없을 경우
        let imgSrc = `images/menu/${choiceProduct.category}/${choiceProduct.subCategory}/${choiceProduct.img}`;

        if (choiceProduct.subCategory == null) {
            imgSrc = `images/menu/${choiceProduct.category}/${choiceProduct.img}`;
        }

        if (choiceProduct.option.temper && choiceProduct.option.temper.length == 2) {
            imgSrc = imgSrc.replace("_H.png", "_I.png");
        }


        // 상품 옵션 정보
        const option = choiceProduct.option;
        // console.log(option);

        // 상품 기본 정보
        let baseHtml = "";
        baseHtml += `<div class = "options-img-mask"><img src= "${imgSrc}" alt= "${choiceProduct.name}"></div>`;
        baseHtml += `<p class = "manu-name">${choiceProduct.name}</p>`;
        baseHtml += `<p class = "acntTaste-mask caption-subInfo">${choiceProduct.acntTaste}</p>`;
        baseHtml += `<p class = "allergy-mask caption-subInfo">알레르기 정보: ${choiceProduct.acntAllergy}</p>`;
        productInfo.innerHTML = baseHtml;
        // console.log(basehtml); // 작 적용이 되는지 확인

        //  초기화
        temperBeen.innerHTML = "";
        sizeShot.innerHTML = "";
        whippingDrizzle.innerHTML = "";
        syrupIceb.innerHTML = "";

        // for in문: 객체 전용 for문
        // ㄴ for(let 키값 in 객체명): 객체의 키를 순회하는 for문
        for(let key in option){
            let optionHtml = "";
            let className = "style1";

            if(key == "topping"){
                let whippingHtml = ""; // 휘핑 들어갈 빈칸
                let syrupHtml = ""; // 시럽 들어갈 빈칸
                let drizzleHtml = ""; // 드리즐 들어갈 빈칸

                whippingHtml += `<dl class= "option-group ${className}">`;
                whippingHtml += `<dt class= "title-section">휘핑</dt>`;
                whippingHtml += `<dd class= "option-dtn-group">`;
                whippingHtml += `<button class= "active manu-name" data-key= "whipping" data-value= "없음">없음</button>`;

                syrupHtml += `<dl class= "option-group ${className}">`;
                syrupHtml += `<dt class= "title-section">시럽</dt>`;
                syrupHtml += `<dd class= "option-dtn-group">`;
                syrupHtml += `<button class= "active manu-name" data-key= "syrup" data-value= "없음">없음</button>`;
                
                drizzleHtml += `<dl class= "option-group ${className}">`;
                drizzleHtml += `<dt class= "title-section">드리즐</dt>`;
                drizzleHtml += `<dd class= "option-dtn-group">`;
                drizzleHtml += `<button class= "active manu-name" data-key= "drizzle" data-value= "없음">없음</button>`;

                option[key].forEach(function(value){
                    const label = optionBtnName[key][value];

                    if(value.includes("크림")){
                        whippingHtml += `<button data-key= "whipping" data-value= "${value}" class= "manu-name">${label}</button>`;;
                        // console.log("휘핑 그룹: ", value); // 분류가 잘 되는지 확인
                    }

                    if(value.includes("시럽")){
                        syrupHtml += `<button data-key= "syrup" data-value= "${value}" class= "manu-name">${label}</button>`;
                        // console.log("시럽 그룹: ", value); // 분류가 잘 되는지 확인
                    }

                    if(value.includes("드리즐")){
                        drizzleHtml += `<button data-key= "drizzle" data-value= "${value}" class= "manu-name">${label}</button>`;
                        // console.log("드리즐 그룹: ", value); // 분류가 잘 되는지 확인
                    }
                });

                whippingHtml += `</dd></dl>`;
                syrupHtml += `</dd></dl>`;
                drizzleHtml += `</dd></dl>`;

                // console.log(syrupHtml);
                
                console.log(optionHtml);
                // optionList.innerHTML = optionHtml;
                // return

                whippingDrizzle.innerHTML += whippingHtml;
                whippingDrizzle.innerHTML += drizzleHtml;
                syrupIceb.innerHTML += syrupHtml;

                continue;
            } 

            optionHtml += `<dl class= "option-group ${className}">`;
            optionHtml += `<dt class= "title-section">${optionName[key]}</dt>`;
            optionHtml += `<dd class= "option-dtn-group">`;

            option[key].forEach(function(value, inx){
                let activeClass = "";
                if(inx == 0) activeClass = "active";

                let label = value; //★
                if(optionBtnName[key] && optionBtnName[key][value] != undefined){
                    label = optionBtnName[key][value];
                }

                // 4) 옵션 가격 라벨 매핑
                let priceTxt = "";

                optionHtml += `
                <button 
                    class= "${activeClass} manu-name"
                    data-key= "${key}"
                    data-value= "${value}"
                >${label} ${priceTxt}</button>
                `;
            });
            optionHtml += `</dd>`;
            optionHtml += "</dl>";

            if(key == "temper" || key == "been" || key == "heat" || key == "candle"){
                temperBeen.innerHTML += optionHtml;
            }
            else if(key == "size" || key == "shot" || key == "fork"){
                sizeShot.innerHTML += optionHtml;
            }
            else if(key == "iceb"){
                syrupIceb.innerHTML += optionHtml;
            }
        }
            // console.log(optionHtml);
            // optionList.innerHTML = optionHtml;

            // 상품의 원가격 출력
            // const basePrice = choiceProduct.price
            total_El.textContent = (choiceProduct.price).toLocaleString();
            // console.log("aaaa", optionHtml);
        }
// #endregion

// #region — 옵션 버튼 클릭하면 할 일 —————————— 
    const total_El = document.querySelector("#options .price .opt-price");
    optionList.addEventListener("click", function(e){
        // if(e.target.tagName != "BUTTON") return; // 버튼 아닐 땐 일하지마

        // strong을 포함한 button일 때만 이벤트 발생훼~~
        const clickBtn = e.target.closest("button"); // 클릭한 버튼
        if(!clickBtn) return;

        // 버튼 스타일 적용
        const dd = clickBtn.parentElement; // 클릭한 버튼의 부모(dd)
        // console.log(clickBtn, dd); // 타겟이랑 부모 잘 들어오는지 확인용

        dd.querySelectorAll("button").forEach(function(btn){
            btn.classList.remove("active");
        });
        clickBtn.classList.add("active");

        // 온도에 속하는 hot 또는 ice 버튼 클릭했을 때      
        const key = clickBtn.dataset.key;
        const value = clickBtn.dataset.value;
        let imgSrc = `images/menu/${choiceProduct.category}/${choiceProduct.subCategory}/${choiceProduct.img}`;
        
        if (choiceProduct.subCategory == null) {
            imgSrc = `images/menu/${choiceProduct.category}/${choiceProduct.img}`;
        }
        
        const isNum = choiceProduct.option.temper && choiceProduct.option.temper.length == 2;
        if (isNum && key == "temper") {
            if (value == "ICE") {
                imgSrc = imgSrc.replace("_H.png", "_I.png");
            } else if(value == "HOT"){
                imgSrc = imgSrc.replace("_I.png", "_H.png");
            }
            const infoImg = options.querySelector(".product-info img");
            infoImg.src = imgSrc;
        }

        updateOptionTotalPrice();
    });
// #endregion

// #region — 옵션 추가 금액 계산하는 함수 —————————— 
    function updateOptionPrice(){
        // console.log("옵션 추가 금액 계산하러옴");
        // 1. 선택된 옵션에 대한 정보를 얻어오는 것
        const selectedBtn = document.querySelectorAll(".option-list dd button.active")
        // 3. 추가금액을 누적 저장할 변수
        let extraPrice = 0;
        const selectedOptions = {};

        selectedBtn.forEach(function(btn){
            const key = btn.dataset.key;
            const value = btn.dataset.value;
            // console.log(key, value);

            // 장바구니 데이터로 만들지 않을 기본 옵션
            if(key == "iceb" && value == "보통") return;
            if(key == "shot" && value == "없음") return;
            if(key == "whipping" && value === "없음") return;
            if(key == "syrup" && value === "없음") return;
            if(key == "drizzle" && value === "없음") return;
            if(key == "heat" && value === "데우지 않음") return;
            if(key == "fork" && value === "필요없음") return;
            if(key == "candle" && value === "필요없음") return

            selectedOptions[key] = value;
            // console.log(key, value);
            
            // 2. 옵션 추가 금액 데이터 표(객체화)
            if(optionPrice[key] && optionPrice[key][value] != undefined){
                // 압축버전 아래 extraPrice = extraPrice + optionPrice[key][value];
                extraPrice += optionPrice[key][value];
            }
        });

        // console.log("추가 금액", extraPrice);
        return {extraPrice, selectedOptions};
    }
// #endregion

// #region — 옵션 - 수량 변경 —————————— 
    const optionOtyArea = document.querySelector("#options .quantity");
    const count_El = optionOtyArea.querySelector(".count");
    const minusBtn = optionOtyArea.querySelector(".minus");
    const plusBtn = optionOtyArea.querySelector(".plus");
    minusBtn.disabled = true;
    
    optionOtyArea.addEventListener("click", function(e){
        const clickBtn = e.target.closest("button");
        if(!clickBtn) return;

        const type = clickBtn.dataset.btn;
        // console.log(type);

        let qty = Number(count_El.textContent); // 수량
        // if(type == "plus") qty = qty + 1;
        if(type == "minus" && qty > 1) qty --;
        if(type == "plus" && qty < 5) qty ++;
        count_El.textContent = qty;
        // 왜 숫자가 안더해지고 문자처럼 합쳐졌는지? let qty = count_El.textContent; 이렇게 되어 있기 때문에 <- (.textContent) 텍스트로 넣었기 때문에. 연결이 되어버림
        // Number("1") -> 문자를 숫자로 변경 / String(1) -> 숫자를 문자로 변경
        // -> 아니면 qty = qty + 1; 가 아닌 qty ++;로 쓰면 바로 숫자로 산술연산되어 나옴.
        // ex.날짜 ("2026"-"03"-"12") 문자로 되어 있지만 변경이 되어야 하기 때문에 내부에서 숫자로 변경 후 변경하는 방식.

        updateOptionTotalPrice();

        // 버튼 비활성화
        minusBtn.disabled = (qty <= 1);
        plusBtn.disabled = (qty >= 5);
    });
// #endregion

// #region — 선택한 상품의 총금액 계산 —————————— 
    function updateOptionTotalPrice(){
        const {extraPrice} = updateOptionPrice();
        const qty = Number(count_El.textContent);
        const totalPrice = (choiceProduct.price + extraPrice) * qty;
        total_El.textContent = totalPrice.toLocaleString();
    }
// #endregion

// #region — 옵션 닫기 —————————— 
    const optionCloseBtn = options.querySelector(".close-btn");
    optionCloseBtn.addEventListener("click", function(){
        // 1) 수량 정보 초기화
        count_El.textContent = 1;
        minusBtn.disabled = true;
        plusBtn.disabled = false;

        // 2) 옵션 닫기 - remove(show)
        options.classList.remove("show");
    });
// #endregion

// #region — 선택한 상품을 장바구니에 담기 —————————— 
    const cartAddBtn = options.querySelector(".cart-add");
    cartAddBtn.addEventListener("click", function(){
        // 필요한 정보: 수량,  옵션정보, 옵션추가금액
        const {extraPrice, selectedOptions} = updateOptionPrice();
        const qty = Number(count_El.textContent);

    // ** 3. cartArr에 일치하는 상품+옵션 검사
    const existItem = cartArr.find(function(item){
        // id가 다르면 탈락
        if(item.id != choiceProduct.id) return false;

        // 옵션이 하나라도 다르면 탈락
        for(let key in selectedOptions){ // options = 객체
            if(item.options[key] != selectedOptions[key]){
                return false;
            }

        }
        
        return true;
    });

    if(existItem){
        msgAlert("같은 상품+옵션이 장바구니에 이미 있습니다.");
        optionCloseBtn.click();
        return
    };

    const cartItem = {
        id: choiceProduct.id, 
        name: choiceProduct.name, 
        price: choiceProduct.price, 
        img: choiceProduct.img, 
        category: choiceProduct.category, 
        subCategory: choiceProduct.subCategory, 
        // 아이템 정보로 저장해서 가져갈지, 또는 장바구니에서 조건을 생성할지
        tempNum: choiceProduct.option.temper?.length || 0, 
        qty: qty, 
        extraPrice: extraPrice, 
        options: selectedOptions
        // 이미지 정보: 상품의 이미지키, 카테고리
    }

    cartArr.push(cartItem);
    console.log("옵션이 있을 때", cartArr);
    renderCartList();

    // ** 4. cartArr에 상품이 담기면, 옵션창 닫기
    optionCloseBtn.click();
    });
// #endregion

// #region — cartArr에 담긴 상품 정보를 화면에 그리기 ——————————
const cartSec = document.querySelector("#cart");
const cartList = cartSec.querySelector(".cart-list");
const cartCloseBtn = cartSec.querySelector(".cart-close-btn");

function renderCartList(){
    cartSec.classList.add("show");

    // console.log("호출");
    // console.log("카트에 담긴 자료", cartArr);

    let html = "";
    cartArr.forEach(function(item, inx){ // inx(carArr 일치하는 상품 삭제)
        // 2. 옵션 라벨 매핑 출력(매핑할 자료 유무)
        let label = "";
        let options = ""; // <span>1 shot</span><span>Small</span><span>토핑 추가</span>
        if(item.options){
            for(let key in item.options){
                if(cartOptionBtnName[key]){ // 옵션키가 있을때만 매핑
                    // console.log("장바구니-옵션키값", optionBtnName[key][item.options[key]]);
                    label = cartOptionBtnName[key][item.options[key]];
                }else{
                    label = item.options[key].toUpperCase(); // .toUpperCase() 소문자를 대문자로 바꿔주는 메서드
                }

                options += `<span>${label}</span>`;
            }
        }
        // console.log("라벨생성", options);
        
        // 1. 상품의 총 금액 계산
        let totalPrice = (item.price * item.qty); // 옵션 없을 때 기본값
        if(item.options){
            totalPrice = (item.price + item.extraPrice) * item.qty; // 옵션 있을 때
        }

        // 3. 수량 변경 버튼 비활성화 조건
        let minusDisabled = "";
        let plusDisabled = "";
        // if(item.qty <= 1) minusDisabled = "disabled";
        if(item.qty >= 5) plusDisabled = "disabled";

        // 4. 마이너스 버튼은 1(삭제). 2~5(마이너스)로 표현 
        let minusLabel = "-";
        if(item.qty <= 1) {
            // minusDisabled = "disabled"
            minusLabel = "x";
        };

        // // 서브탭 이미지 경로
        // let imgSrc = `images/menu/${choiceProduct.category}/${choiceProduct.subCategory}/${choiceProduct.img}`
        // if(choiceProduct.subCategory == null){
        //     imgSrc = `images/menu/${choiceProduct.category}/${choiceProduct.img}`;
        // }

        // // 상품이미지(기본, hot&ice)
        // let imgName = item.img;
        // if(item.options && item.tempNum == 2){
        //     if(item.options.temper == "ice"){
        //         imgName = imgName.replace(".png", "_ice.png");
        //     }else{
        //         imgName = imgName.replace(".png", "_hot.png");
        //     };
        // }

        // 위 주석 2개 합친거
        let imgSrc = `images/menu/${item.category}/${item.subCategory}/${item.img}`;

        if (item.subCategory == null) {
            imgSrc = `images/menu/${item.category}/${item.img}`;
        }

        if (item.options && item.tempNum == 2) {
            if (item.options.temper == "ICE") {
                imgSrc = imgSrc.replace("_H.png", "_I.png");
            } else {
                imgSrc = imgSrc.replace("_I.png", "_H.png");
            }
        }

        // 화면에 그리는 영역
        html += `
            <li class= "item" data-index = "${inx}">
                <div class = "options-img-mask"><img src= "${imgSrc}" alt= "${item.name}"></div>
                <div class = "cart-info">
                    <div class= "name content-menu-name">${item.name}</div>
                    <div class= "label">${options}</div>
                    <div class= "quantity">
                        <div class= "price">${totalPrice.toLocaleString()}원</div>
                        <button class= "minus" ${minusDisabled} data-btn= "minus">${minusLabel}</button>
                        <span class= "count">${item.qty}</span>
                        <button class= "plus" ${plusDisabled} data-btn= "plus">+</button>
                    </div>
                </div>
            </li>
        `;
    });

    cartList.innerHTML = html;
    renderCartTotal();
}
// #endregion

// #region — 사용자가 열고 닫는 버튼 ——————————
cartCloseBtn.addEventListener("click", function(e){
    cartSec.classList.toggle("show");
});
// #endregion

// #region — 장바구니 상품 삭제, 수량 변경 —————————— 
cartList.addEventListener("click", function(e){
    if(e.target.tagName != "BUTTON") return; // 바튼이 아닐 때는 일 안함

    const type = e.target.dataset.btn; // minus, plus, remove  벼튼 ㅏㅌ입
    const li = e.target.closest("li"); // index 순번을 가지고 있는 부모요소
    const inx = li.dataset.index // li의 index 번호 추출


    // 아이템 삭제
    if(type == "remove"){
        cartArr.splice(inx, 1); // splice(시작인덱스, 몇개): 자르기
    }

    // 수량 변경
    const item = cartArr[inx]; // 카트 배열에 들어있는 아이템 찾기
    
    // 수량이 1일 때, 수량이 2~5일 때
    if(type == "minus"){ // 수량 2~5일 때 - 수량 감소
        if(item.qty > 1){
            item.qty--;
        }else{ // 수량 1일 때 - 삭제
            const result = confirm("상품을 삭제할까요?")
            if(result) cartArr.splice(inx, 1); // splice(시작인덱스, 몇개): 자르기
        }
    }

    if(type == "plus" && item.qty < 5){
        item.qty++;
    }

    renderCartList();
});
// #endregion

// #region — 주문 총금액 출력 —————————— 
function renderCartTotal(){
    // cartArr에 저장된 상품의 금액을 모두 더해서 화면에 표시
    let orderPrice = 0;
    cartArr.forEach(function(item){
        let itemPrice = item.price; // 옵션 없음
        if(item.options){
            itemPrice = (item.price + item.extraPrice); // 옵션 있음
        }
        orderPrice += itemPrice * item.qty; // 상품가격 * 수량
    });

    // 화면에 출력
    const order_El = cartSec.querySelector(".order-price");
    order_El.textContent = orderPrice.toLocaleString()+"원";
}
// #endregion

// #region — 주문버튼 클릭하면 할 일 —————————— 
const orderArr = []; // 주문 내역(주문내역버튼 클릭시 보여줄 데이터)
const orderBtn = cartSec.querySelector(".order-area .order-btn");

orderBtn.addEventListener("click", function(){

    // 불필요한 데이터 제거
    const newItems = cartArr.map(function(item){
        const newItem = {};
        for(let key in item){
            if(key == "tempNum") continue;
            newItem[key] = item[key];
        }
        return newItem;
    });

    // orderArr에 newItem에 저장된 객체를 담기
    orderArr.push(newItems);
    console.log("주문 내역", orderArr);

    // cartArr = [] 비우기 (초기화)
    cartArr.length = 0;
    renderCartList();

    // 장바구니를 닫기 (안보이게)
    cartSec.classList.remove("show");

    // 성공 메세지
    msgAlert("주문이 완료되었습니다.");
})
// #endregion

// #region — 메세지 관리 —————————— 
function msgAlert(msg){
    // 메세지 보여주기~
    const msgArea = document.querySelector(".msg-area");
    const msgBox = document.querySelector(".msg-area .inner");
    msgBox.textContent = msg;

    // msg-area.show 메세지창 보이게
    msgArea.classList.add("show");

    // msg-area.show 메세지창 가리기
    setTimeout(function(){
        msgArea.classList.remove("show");
    }, 1500);
}
// #endregion

// ————— 첫번째 카테고리 버튼 클릭 - 페이지가 로드되면 강제 클릭 —————————— 
mainTabBtn[0].click();

// 페이지가 로드되면 첫번째 메인 클릭 실행
    /* 112줄 -> const productArr = makeFinalCate(mainName);
    
        질문 - 어차피 mainName도 메뉴 이름이고, productArr도 결과값이니까 한 번만 만들어두면 편하지 않나?

        문제 - 메인버튼에도 저장된 변수가 있어서 지워봤는데, 적용이 안됨. (서브 카테고리 버튼 해제했을 때 전체 메뉴가 안나온다)
            추측! 전역이 아니라 지역에 있어서 메인 버튼이 클릭 되었을 때 작동함.

        -> 그래서 전역으로 빼봤음 (메뉴이름 변수도 같이 전역으로 빼봤음 this빼고 데이터명 그대로 넣어줌)
        그런데 아예 메인버튼도 작동을 안함.

        결론 -
        왜? 둘 다 고정값이 아니라 상태값.
            mainName = 지금 클릭한 메인카테고리
            subName = 지금 클릭한 서브카테고리
            productArr = 지금 선택 상태로 다시 필터한 결과
        즉 매 클릭마다 새로 계산해야 함.. 똥멍청슨했다..
    */

    /* 115줄 -> 
        리턴을 넣어야 온오프 적용이 됨.. 이유 물어보기!
    */

    /* 서브카테고리
    1. 서브카테고리 추가 -> all(전체) -> 화면구성통일(안정화)
    2. 서브카테고리 삭제 (원래 피그마 디자인으로)
    3. 지금 그대로 유지 
        단점 - 카테고리 변경할때마다 위치 바뀜
              첫번째 카테고리 클릭했을 때 티가 안 남

    input: 
        "topping": ["휘핑크림", "바닐라시럽", "헤이즐시럽", "캬라멜드리즐", "초코드리즐"]
    output: 
        "topping": {
        "크림": ["휘핑크림"], 
        "시럽": ["바닐라시럽", "헤이즐시럽"], 
        "드리즐": ["캬라멜드리즐", "초코드리즐"]
    }
*/