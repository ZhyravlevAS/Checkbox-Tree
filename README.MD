Инициализация дерева
-

Добавить в шаблон тэг компонента: `<app-checkbox-tree-root></app-checkbox-tree-root>`

В классе добавить ссылку на компонент:
<pre>
@ViewChild(CheckboxTreeRootComponent)
  public tree: CheckboxTreeRootComponent;
</pre>

`tree` будет доступно после View инициализации `ngAfterViewInit`

1. Если вы хотите подписаться на события изменения дерева, сделайте это в первую очередь.
2. Затем можно передать данные для визуализации компонента.

События
-

1. `onChangeCheckboxEvent: Subject <ChangeCheckboxEvent> ` - будет вызвано каждый раз при изменении состоянии чекбокса
2. `onToggleNodeEvent: Subject <CheckboxTreeNode>` - будет вызвано каждый раз при изменении вида дерева (скрыть/показать ветку)

Методы
-
1. `setData(data: CheckboxTreeNode[]): void` - принимает входные данные и инициализирует компонент один раз
2. `get(id: string | number): CheckboxTreeNode` - возвращает элемент дерева по его ID
3. `onToggleNode(id: string | number, value: boolean): void` - показать / скрыть ветку дерева по её ID
4. `onChangeCheckbox(id: string | number, value: boolean): void` - выбрать / убрать чекбокс по ID элемента

Свойства
-
1. `localStorage: boolean` - флаг записи / чтения состояния localStorage. По умолчанию true.

Интерфейсы
-

<pre>
interface ChangeCheckboxEvent {
  all: CheckboxTreeNode[]; - все выбранные элементы
  lastLevel: CheckboxTreeNode[]; - все выбранные элементы последних уровней
}
</pre>

<pre>
interface CheckboxTreeNode {
  id: string | number;
  name: string;
  isOpen?: boolean;
  isChecked?: boolean;
  isIndeterminate?: boolean;
  children?: CheckboxTreeNode[]; - генерируется автоматически
  parentId?: string | number;
  data?: any; - произвольные данные
}
</pre>

Пример входных данных
-
<pre>
[
  {
    id: 'node-1',
    name: 'node-1',
    isOpen: false,
    isChecked: false,
    data: {foo: 'bar'},
  },
  {
    id: 'node-1-1',
    parentId: 'node-1',
    name: 'node-1-1',
    isOpen: false,
    isChecked: false,
  }
]
</pre>
