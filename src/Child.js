//hoc (high order component) : 함수안에 인수로 컴포넌트 함수를 넣어서 다시 새로운 컴포넌트를 반환
import { memo } from 'react';
import { isEqual } from 'lodash'; //참조형 자료 값 비교
/* 
  memo : 특정 컴포넌트를 memoryzation해서 (메모리할당) 
  부모 컴포넌트의 state값이 변경되서 재랜더링될 때 자식컴포넌트도 같이 재랜더링되는 것이 아닌,
  렌더링된 결과물을 재활용(자식컴포넌트의 불필요한 재랜더링 방지)

  컴포넌트함수를 memo로 메모리제이션 처리 했더라도 부모로부터 전달받는 prop값이 있을 시 재호출됨

*/

//const Child = (props) => {
function Child(props) {
	console.log('child');

	// 무거운 작업을 실행시켜보겠습니다.
	const heavyWork = () => {
		let num = 0;
		for (let i = 0; i < 50000000; i++) {
			num++;
		}
		return num;
	};

	const { Counter, updateCounter } = props;
	return (
		<div>
			<h1>Child-{Counter}</h1>
			<h2>{heavyWork()}</h2>
			<button onClick={updateCounter}>update</button>
		</div>
	);
}

export default memo(Child, isEqual);
