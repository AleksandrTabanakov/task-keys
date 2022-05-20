/*
1. На вход в компонент `Keys` будет приходить 2 пропа: `sorting: 'ASC' | 'DESC'` и `initialData: IItem[]`, где `IItem` это:
```typescript
interface IItem {
    id: number;
    name: string;
}
```
2. Нужно вывести поле `name` каждого элемента.
3. При клике на имя оно должно превращаться в `<input>`. С помощью этого поля ввода имя можно редактировать, сохранение должно происходить по нажатию `Enter`, отмена изменений по нажатию `Escape`.
4. Вверху страницы есть кнопка `Change sorting`.
 При клике на неё меняется направление сортировки по полю `id`. Если эта кнопка нажимается во время редактирования, то текущее состояние должно сохраняться. Т.е. редактируемый элемент должен остаться редактируемым, если пользователь что-то ввёл &ndash; его изменения не должны исчезнуть.
*/
import { useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    function keyboard() {
        return props.initialData.map((item) => {
            return {
                text: item.name,
                Vhod: item.name,
                id: item.id,
                vhojdenie: false,
            };
        });
    }
    const [Family, setFamily] = useState(keyboard());
    if (props.sorting === 'ASC')
        Family.sort(function (
            a: { vhojdenie: boolean; text: string; Vhod: string; id: number },
            b: { vhojdenie: boolean; text: string; Vhod: string; id: number },
        ) {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            return 0;
        });
    else
        Family.sort(function (
            a: { vhojdenie: boolean; text: string; Vhod: string; id: number },
            b: { vhojdenie: boolean; text: string; Vhod: string; id: number },
        ) {
            if (a.id < b.id) {
                return 1;
            }
            if (a.id > b.id) {
                return -1;
            }
            return 0;
        });
    function begin(index: number) {
        const copy = [...Family];
        copy[index].vhojdenie = true;
        setFamily(copy);
    }
    function tuch(index: any, event: any) {
        if (event.key === 'Enter' || event.key === 'Escape') {
            const copy = [...Family];
            copy[index].vhojdenie = false;
            if (event.key === 'Enter') copy[index].text = copy[index].Vhod;
            else copy[index].Vhod = copy[index].text;
            setFamily(copy);
        }
    }
    function save(index: any, event: any) {
        const copy = [...Family];
        copy[index].Vhod = event.target.value;
        setFamily(copy);
    }
    function List() {
        return (
            <ol>
                {Family.map((item, index) => {
                    if (item.vhojdenie) {
                        return (
                            <li key={item.id}>
                                {
                                    <input
                                        value={item.Vhod}
                                        onKeyDown={(event) =>
                                            tuch(index, event)
                                        }
                                        onChange={(event) => save(index, event)}
                                    />
                                }
                            </li>
                        );
                    } else {
                        return (
                            <li key={item.id}>
                                {
                                    <span onClick={() => begin(index)}>
                                        {item.text}
                                    </span>
                                }
                            </li>
                        );
                    }
                })}
            </ol>
        );
    }
    return <div>{List()}</div>;
}
