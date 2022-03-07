## 프로젝트 설명

- 구글 캘린더 클론 프로젝트
- 실서버 주소: https://google-calendar-pearl.vercel.app/

## 사용 스택

- React (create-react-app)
- Redux toolkit
- Tailwind css
- Typescript

## 로컬 실행

클론 후, 아래 명령어 입력. `localhost:3000` 접속

```
  yarn install
  yarn start
```

## 구현된 기능

1. Redux-Toolkit를 이용한 상태 관리
2. 주별/월별 캘린더 보기, 선택한 날짜로 화면 변경
3. 왼쪽 상단 date picker
4. 이벤트 등록 및 삭제 기능 (제목, 날짜, 시간, 색상)
5. 등록된 이벤트 확인 (주별/월별)
6. 그 외: 오늘 버튼 구현, 상단 바 주/월 변경 버튼 구현, 이벤트 만들기 버튼 구현, 상단 좌측 사이드바 접기/펼치기 구현

## 파일별 설명

### src/components

- `components/GoogleCalendar`: App.tsx 페이지에서 보여주는 최종 구글 캘린더 컴포넌트
- `components/Header`: 헤더 컴포넌트
- `components/Modal`: 새로운 모달 컴포넌트. 이벤트 새로 작성시 사용
- `components/MonthCalendar`: 달력 일정 컴포넌트
- `components/ShowModal`: 상세 모달 컴포넌트. 이벤트 확인, 삭제 시 사용
- `components/SideCalendar`: 왼쪽 상단 캘린더. 모달의 datepicker로도 사용
- `components/WeekCalendar`: 주별 일정 컴포넌트

### src/utils

- `utils/date`: 날짜 관련 함수 모음. 요일 가져오기, 이전/다음 달 날짜 가져오기 시간 가져오기 등
- `utils/index`: 공통 함수 모음.

### src/store

- `store/index`: redux 세팅 (store 생성)
- `store/calendar`: 달력 관련 reducer. 날짜 및 시간 선택 시 사용
- `store/event`: 일정 관련 reducer. 일정 생성 및 삭제 시 사용
- `store/modal`: 모달 관련 reducer. 모달 열고 닫을시 사용

### src/interface

- `interface/index`: 타입 체크를 위한 인터페이스 정의 (typescript)

### 사진 첨부

#### PC 버전

![google calendar clone - week](https://user-images.githubusercontent.com/72732446/156892524-78d4a595-6f80-45fc-8586-2feb3976887c.png)

![google calendar clone - month](https://user-images.githubusercontent.com/72732446/156892546-36c96ef2-8fec-43b2-8852-a51c1872f8df.png)

![google calendar clone - month with modal](https://user-images.githubusercontent.com/72732446/156892556-29b432e3-ce45-4279-818c-83a201a91a3c.png)

![google calendar clone - month with modal new](https://user-images.githubusercontent.com/72732446/156892570-347cb4be-9ec2-498a-bea5-8ddc0f31b6e8.png)

![google calendar clone - month delete](https://user-images.githubusercontent.com/72732446/156892585-11a5c341-3bda-420b-971d-2a2218dc31e9.png)

![google calendar clone -month create](https://user-images.githubusercontent.com/72732446/156892596-af30011e-b15d-4b92-bae5-f3216daedf72.png)

#### 모바일 버전

<table>
  <tr>
    <td> <img src="https://user-images.githubusercontent.com/72732446/157030615-01949570-b444-40a5-9e74-9cb7f0c8b0b0.png"  alt="week mobile blank" ></td>
    <td><img src="https://user-images.githubusercontent.com/72732446/157030656-908592b8-16d3-48c6-b356-fab70bb0c6c8.png" alt="week mobile new modal"></td>
    <td><img src="https://user-images.githubusercontent.com/72732446/157030685-1823a430-41dc-4e6c-80cc-dc0eba0d6f32.png" alt="week mobile show"></td>
  </tr> 
   <tr>
    <td><img src="https://user-images.githubusercontent.com/72732446/157030739-686c54e1-70f1-4e1c-95c3-db5d5852a51c.png" alt="week mobile no header"></td>
    <td><img src="https://user-images.githubusercontent.com/72732446/157030829-2e655f9e-28d2-4315-8e66-35e14fceef48.png"  alt="calendar mobile"></td>
    <td><img src="https://user-images.githubusercontent.com/72732446/157030972-89999ae0-55d9-4736-99ef-aae3877a3758.png"  alt="calendar mobile modal"></td>
  </tr>
</table>
