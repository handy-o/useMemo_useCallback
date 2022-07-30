//hoc (high order component) : 함수안에 인수로 컴포넌트 함수를 넣어서 다시 새로운 컴포넌트를 반환
import { memo, useMemo } from 'react';
import { isEqual } from 'lodash'; //참조형 자료 값 비교
/* 
  memo : 특정 컴포넌트를 memoryzation해서 (메모리할당) 
  부모 컴포넌트의 state값이 변경되서 재랜더링될 때 자식컴포넌트도 같이 재랜더링되는 것이 아닌,
  렌더링된 결과물을 재활용(자식컴포넌트의 불필요한 재랜더링 방지)

  컴포넌트함수를 memo로 메모리제이션 처리 했더라도 부모로부터 전달받는 prop값이 있을 시 재호출됨
*/

/*
  1. 부모 컴포넌트가 재랜더링시 자식 컴포넌트로 같이 재랜더링됨
  2. 부모에서 자식으로 props전달 시 재랜더링됨

  memo: 컴포넌트 자체를 memoization처리해서 재랜더링 방지
  예외사항 : 배열, 객체, 함수같은 참조형 자료가 props로 전달될 때 재랜더링 됨

  lodash - isEqual: props로 젇날되는 배열, 객체의 참조주소가 아닌 값자체를 비교해서 재랜더링 방지
  useCallback: props로 전달되는 함수자체를 memoization
  useMemo: 컴포넌트가 재랜더링시 매번 동일값을 리턴하면 해당 값 자체를 memoization


  실행속도를 위해 메모리를 더 많이 할당
  memoization을 불필요하게 너무 많이 적용하면 코드 가독성이 떨어짐
  memoization된 요소는 가비지컬랙션에서 제외

  garbage collection이란?
  - 더이상 쓰이지 않는 메모리를 자동으로 제거

*/

//const Child = (props) => {
function Child(props) {
	console.log('child');

	// 무거운 작업을 실행시켜보겠습니다.
	// 내부적으로 매번 같은 값을 반환하는 연산을 처리할 때 계속해서 재연산하는 것은 비효율적
	// 특정 값을 반환하는 구문자체를 메모이제이션처리,
	// 이때 의존성 배열을 등록하면 그 상황에서만 재 연산 처리
	const heavyWork = useMemo(() => {
		let num = 0;
		for (let i = 0; i < 800000000; i++) {
			num++;
		}
		return num;
	}, []);

	const { Counter, updateCounter } = props;
	return (
		<div>
			<h1>Child-{Counter}</h1>
			<h2>{heavyWork}</h2>
			<button onClick={updateCounter}>update</button>
		</div>
	);
}

export default memo(Child, isEqual);
