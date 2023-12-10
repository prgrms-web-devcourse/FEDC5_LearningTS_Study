import { QuerySelectItem } from '../globalTypes';

interface HeaderParams {
  $target: QuerySelectItem;
  text: string;
}

export default function Header({ $target, text }: HeaderParams) {
  // new 미사용 방어코드
  if (!new.target) {
    throw new Error('new 키워드를 사용하여야 합니다.');
  }

  const $header: QuerySelectItem = document.createElement('h1');

  $target?.appendChild($header);

  this.render = () => {
    $header.textContent = text;
  };

  this.render();
}
