
# 실시간 코인 시세 조회 
## Info
>React + Typecript + Redux-thunk 프로젝트입니다 </br>
>ag-grid 라이브러리를 사용해서 깔끔한  UI를 제공합니다.</br>
>국내 가상화폐 거래소 Upbit와 국제 가상화폐 거래소 Binance에서 api 데이터를 받아왔습니다.</br>
>사이트에서 제공하는 Websocket api , Rest api를 사용하였습니다.</br>
>Netlify 배포</br>

## Install

```
//root dir
npm install
npm run start
```

## 구조

```
src                        			 
│
├── components              
|     ├──CoinTable.tsx
|     ├──CoinTableWrap.tsx
|     ├──CoinTableStyles.css
├── store                 
│     ├── action        
│     ├── reducer          
│     └── type             
│
├── index.tsx  
└── App.tsx
```

## 사용 기술 스택

React , Typescript , Redux , Redux-thunk , socket.io , ag-grid-react

## 실행 화면

![upbit](https://user-images.githubusercontent.com/73515375/127759342-24240c09-2e5a-4190-87ed-da365559ce2f.gif)

## 개발 이슈

>[Notion](https://www.notion.so/photoshop-2c6ae95cf7024776b252071dc1c1b550, "notion link")


