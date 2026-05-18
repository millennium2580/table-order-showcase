// 선택자를 먼저 작성
    const mainTabArea = document.querySelector(".tab-main");
    // 변수저장 상수. (카테고리 부모 ui)
    const mainTabBtn = mainTabArea.querySelectorAll("li")
    // 변수저장 상수. (카테고리 li)


// ————————— 🅼🅰🅸🅽 카테고리 ————————— 
    mainTabBtn.forEach(function(btn, i){
    // 탭메뉴버튼.배열을 반복해.실행문
        btn.addEventListener("click", function(){
        // 버튼.어떤일이 발생하면 실행해(클릭-어떤일, 실행문
            const mainName = this.dataset.main;
            // 변수저장 상수 = 해당.HTML에 있는 data 값을 가져와. main이라는 이름을 가진;

            // 메인 카테고리의 버튼 활성화/비활성화
            mainTabBtn.forEach(function(b){
                b.classList.remove("main-on");
            });
            this.classList.add("main-on");

            const mainFiler = menus.filter(function(item){
            // 변수저장 상수 = 상품변수 데이터를 가져와서.걸러내(실행문(매개변수))
                if(mainName == "new"){
                // 조건문(data이름이 == "new"와 같다면 실행해)
                    return item.new == true;
                    // 사본을 보내줘 상품변수데이터중(매개변수).신상품이 == 참과 같다면;
                }
                return item.category == mainName;
                // 사본을 보내줘 상품변수데이터중(매개변수).카테로리가 == data 이름과 일치한다면;
            });

            let subArr = [];
            // 변수저장 변수 = [빈공간];
            
            if(mainName != "new"){
            // 조건문(data이름)이 != 상품변수데이터중 "new"라는 이름과 불일치하면 실행해)
                subArr = makeSubCate(mainFiler);
                // (변수)빈공간은 = 서브 카테고리 목록을 만들어서(호출함수)(상품변수데이터 필터를 넣어서) 변수에 넣어;
            }

            // console.log("리턴받은 서브카테고리 출력", subArr);
            // 콘솔창에.로그를 띄워줘("리턴받은 서브카테고리 출력"라는 이름으로, 빈공간(변수));

            renderSubCate(subArr,mainName);
            // 함수이름(서브카테고리를 그리는 함수)에게(변수를 보낼게 32번줄에 새로 저장한 서브카테고리를)

            // 서브카테고리가 없을 때 final함수 바로 호출
                // if(subArr.length == 0){
                //     const productArr = makeFinalCate(mainName);
                //     // console.log(productArr);

                //     renderProductList(productArr);
                // }

            // 41 new방식 
                const productArr = makeFinalCate(mainName);
                renderProductList(productArr);
        })
    });

// ———————————————————— 섭카 공부용 (테이블 오더에 섭카 안들어감.) <- 넣을까? 흠ㅁㅁㅁㅁㅁㅁㅁ 고민 보류 땅땅 ——————————————————————————————————————
// ————————— 🅂🅄🄱 카테고리 배열을 생각하는 함수 ————————— 
    function makeSubCate(arr, mainName){
    // 실행해. 함수이름(매개변수){
        const subCate = [];
        // 변수저장 상수 = 빈공간;
        arr.forEach(function(item, i){
        // 매개변수.배열을 반복해(실행문(매개변수){
            if(item.subCategory && !subCate.includes(item.subCategory)){
            // 조건문(상품변수데이터중.서브카테고리)와 && 둘 다 참일 때 실행해.
                subCate.push(item.subCategory);
            }
        })

        // console.log("서브 카테고리 배열", subCate);
        return subCate;
    }

// ————————— 첫번째 카테고리 버튼 클릭 - 페이지가 로드되면 강제 클릭 —————————
    mainTabBtn[0].click();
    
// ————————— 🅂🅄🄱 카테고리를 화면에 그리는 함수 ————————— 
    function renderSubCate(arr, mainName){
        const subTabArea = document.querySelector(".tab-sub")
        let html = "";

        arr.forEach(function(sub,inx){

            let subClass = "";
            // if(inx == 0) subClass = "sub-on"
            html += `<li data-sub="${sub}" class="${subClass}"><button>${sub}</button></li>`;
        
        });

        // console.log(html);
        subTabArea.innerHTML = html;

        // 🅂🅄🄱 카테고리가 생성된 후, 클릭 환경 생성
        const subTabBtn = subTabArea.querySelectorAll("li");
        subTabBtn.forEach(function(btn){
            btn.addEventListener("click",function(){
                const subName = this.dataset.sub;

                const btnOn = this.classList.contains("sub-on");

                // 이미 켜져 있던 버튼을 다시 누른 경우 -> 끄기
                if(btnOn){
                    this.classList.remove("sub-on");

                    // 서브 선택 해제됐을 때-> 메인카테고리 전체 상품 다시 출력
                    const productArr = makeFinalCate(mainName);
                    renderProductList(productArr);
                    // 리턴을 넣어야 온오프 적용이 됨.. 이유 물어보기!
                    return;
                }

                subTabBtn.forEach(function(b){
                    b.classList.remove("sub-on")
                });
                this.classList.add("sub-on")

                // 1. 선택한 메인카테고리+서브카테고리에 일치하는 상품을 메뉴데이터에서 필터
                const productArr = makeFinalCate(mainName, subName);
                console.log(productArr);

                // 2. 상품리스트를 화면에 렌더링
                renderProductList(productArr);
            });
        });

        // 첫번째 서브 자동 클릭
            // if(subTabBtn.length > 0){
            //     subTabBtn[0].click();
            // }
    }

// ————————— 상품리스트 화면에 출력하는 함수 —————————
    function renderProductList(productArr){
        const productArea = document.querySelector(".product-list")
        // console.log("productArea 전체", productArea);

        let html = "";
        productArr.forEach(function(item){
            // console.log("현재 item 확인하기", item);

            let imgSrc = `images/menu/${item.category}/${item.subCategory}/${item.img}`
            if(item.subCategory == ""){
                imgSrc = `images/menu/${item.category}/${item.img}`
            }

            html += 
            `<li class="item" data-id="${item.id}"><div class="ui">
                <div class = "img-mask"><img src="${imgSrc}" alt="${item.name}"></div>
                <dl>
                    <dt class = "content-menu-name">${item.name}</dt>
                    <dd class = "price content-price">${item.price.toLocaleString()+"원"}</dd>
                    <dd class = "acntAllergy"> <div class="allergy-mask caption-subInfo"> 알레르기: ${item.acntAllergy} </div> </dd>
                </dl>
            </div></li>`
        });

        productArea.innerHTML = html;
        
        // 상품리스트(버튼)를 클릭하면, 선택한 상품의 정보 하나를 옵션창에 띄움
            const productBtn = productArea.querySelectorAll("li");
            productBtn.forEach(function(btn){
                btn.addEventListener("click", function(){
                    const id = this.dataset.id;
                    const choiceproduct = menus.find(function(item){
                        return item.id == id;
                    });
        
                    console.log(choiceproduct);
                });
            });
    }


// ————————— 🅼🅰🅸🅽+🅂🅄🄱 카테고리 최종 필터를 생성하는 함수 ————————— 
    function makeFinalCate(mainName, subName){
        const finalFilter = menus.filter(function(item){
            // 첫번째 신메뉴를 클릭했을 때
            if(mainName == "new"){
                return item.new == true; 
            }
            // 서브카테고리가 없는 경우
            if(!subName){
                return item.category == mainName;
            }
            // 메인과 서브가 일치할 때 (또는 || / 둘다 &&)
            return item.category == mainName && item.subCategory == subName;
        });
        // console.log(finalFilter);
        return finalFilter;
    }


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
    */
