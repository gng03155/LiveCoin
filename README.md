# 실시간 코인 시세 조회
## 간단 설명
지인에게 부탁받아 만들게된 프로젝트이기에 사용자 편의성에 중점을 두어 ag-grid 라이브러리를 채택했습니다<br>
국내 가상화폐 거래소 Upbit와 국제 가상화폐 거래소 Binance에서 api 데이터를 받아왔습니다.<br>
Websocket api , Rest api를 모두 사용하였습니다.<br>
## Install
```
npm install
npm run start
```
## 구조
```
root                        			 
│
├── components              
|
├── config                
│				
├── pages                 
│     ├── index.tsx             // '/'
│     ├── release-note.tsx      // '/release-note'
│     ├── _app.tsx        
│     ├── _document_.tsx        
│     ├── index.scss      
│     └── api             
│
├── public  
│     └── assets          
│
└── styles                          
      ├── global-style.ts
      ├── styled.d.ts    
      └── styled.d.ts    

```
## 사용 기술 스택
React , Typescript , Redux , Redux-thunk , Websocket , ag-grid-react


## 실제 시연 영상

## 개발 이슈
