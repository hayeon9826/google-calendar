// class를 string의 배열로 받아 Join
// 여러개의 조건에 맞춰서 className을 다르게 주기 위해 사용
export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
