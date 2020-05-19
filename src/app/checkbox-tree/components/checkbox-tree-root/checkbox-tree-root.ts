import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Subject, Subscriber } from 'rxjs';
import { CheckboxTreeService } from '../../services/checkbox-tree.service';

@Injectable()
export class CheckboxTreeRoot {

  /**
   * Входные данные
   */
  public data: CheckboxTreeNode[] = [];

  /**
   * Хранит подготовленное дерево для рендеренга на UI
   */
  public tree: CheckboxTreeNode[] = [];

  /**
   * Событие изменения состояния чекбокса
   */
  protected changeCheckboxEvent: Subject<ChangeCheckboxEvent> = new Subject();

  /**
   * Событие изменения блока
   */
  protected toggleNodeEvent: Subject<CheckboxTreeNode> = new Subject();

  /**
   * Ключ читаем localStorage или нет
   */
  protected readLocalStorage: boolean = true;

  /**
   * Флаг инициализации
   */
  private init: boolean;

  /**
   * Подписчики
   */
  private observable: any[] = [];

  /**
   * =====================================================
   * События используются только для связи родительского
   * компонента дерева и дочерних элементов
   * =====================================================
   */
  static CHANGE_CHECKBOX_EVENT: Subject<CheckboxTreeNode> = new Subject();
  static TOGGLE_NESTED_EVENT: Subject<CheckboxTreeNode> = new Subject();

  constructor(protected checkboxTreeService: CheckboxTreeService,
              protected cdr: ChangeDetectorRef) {
    //
  }

  /**
   * Инициализация
   */
  protected initComponent(data: CheckboxTreeNode[]): void {
    this.checkboxTreeService.checkInputData(data);
    this.data = data;

    /**
     * Если читаем / сохраняем данные в localStorage
     */
    if (this.readLocalStorage) {
      this.checkboxTreeService.localStorageReader(this.data);
      this.searchChecked();
    }

    /**
     * Подготовка дерева при первой загрузки компонента
     */
    this.tree = this.checkboxTreeService.buildTree(this.data);
    this.cdr.detectChanges();

    /**
     * Если уже в работе
     */
    if (this.init) {
      return;
    }

    /**
     * Подписываемся на события
     */
    this.observable.push(CheckboxTreeRoot.CHANGE_CHECKBOX_EVENT.subscribe((next: CheckboxTreeNode) => this.changeCheckbox(next.id, next.isChecked)));
    this.observable.push(CheckboxTreeRoot.TOGGLE_NESTED_EVENT.subscribe((next: CheckboxTreeNode) => this.toggleNode(next.id, next.isOpen)));

    this.init = true;
  }

  /**
   * Убиваем всех подписчиков
   */
  protected destroyComponent(): void {
    for (const observable of this.observable) {
      if (observable instanceof Subscriber) {
        observable.unsubscribe();
      }
    }
  }

  /**
   * Установить значение чекбокса
   * @param id
   * @param value
   */
  protected changeCheckbox(id: string | number, value: boolean): void {

    /**
     * Находим элемент
     */
    const checkbox = _.find(this.data, {id});

    /**
     * Выходим, если не существует
     */
    if (_.isNil(checkbox)) {
      return;
    }

    this.changeChildren(id, value);
    this.changeParent(checkbox);
    this.searchChecked();

    /**
     * Если читаем / сохраняем данные в localStorage
     */
    if (this.readLocalStorage) {
      this.checkboxTreeService.localStorageBuilder(this.data);
    }

    this.tree = this.checkboxTreeService.buildTree(this.data);
  }

  /**
   * Открыть / закрыть блок
   * @param id
   * @param value
   */
  protected toggleNode(id: string | number, value: boolean): void {

    /**
     * Находим элемент и меняем isOpen
     */
    const node = _.find(this.data, {id});

    /**
     * Выходим, если не существует
     */
    if (_.isNil(node)) {
      return;
    }

    node.isOpen = value;

    /**
     * Если читаем / сохраняем данные в localStorage
     */
    if (this.readLocalStorage) {
      this.checkboxTreeService.localStorageBuilder(this.data);
    }

    this.toggleNodeEvent.next(node);
    this.tree = this.checkboxTreeService.buildTree(this.data);
  }

  /**
   * Найти элемент по ID
   * @param id
   */
  protected getNode(id: string | number): CheckboxTreeNode {
    return _.find(this.data, {id});
  }

  /**
   * Метод для оптимизации работы *ngFor
   * @param index
   * @param item
   */
  protected trackBy(index: number, item: any): number {
    return item.uid;
  }

  /**
   * Метод меняет состояние выбранного
   * элемента и всех дочерних
   * @param id
   * @param isChecked
   */
  private changeChildren(id: number | string, isChecked: boolean): void {

    /**
     * Мапим элемены меняя isChecked
     * isIndeterminate всегда false
     */
    _.map(_.filter(this.data, {id}), (o: CheckboxTreeNode) => {
      o.isChecked = isChecked;
      o.isIndeterminate = false;
    });

    /**
     * Перебираем все дочерние элементы
     * Вызываем changeChildren в рекурсии
     * до тех пор пока они есть
     */
    _.forEach(
      _.filter(this.data, {parentId: id}),
      (o: CheckboxTreeNode) => this.changeChildren(o.id, isChecked),
    );
  }

  /**
   * Метод меняет состояние чекбоксов родителей
   * @param data
   */
  private changeParent(data: CheckboxTreeNode): void {

    /**
     * Выходим если parentId отсутствует или null / undefined
     */
    if (_.has(data, 'parentId') === false && _.isNil(data.parentId)) {
      return;
    }

    /**
     * Найти родителя и дочерние элементы
     */
    const parent = _.find(this.data, {id: data.parentId});
    const children = _.filter(this.data, {parentId: parent.id});

    /**
     * Проверка и установка необходимых статусов
     */
    const isChecked = _.map(children, 'isChecked');
    const isIndeterminate = _.map(children, 'isIndeterminate');

    const everyIsChecked = _.every(isChecked, Boolean);
    const someIsChecked = _.some(isChecked, Boolean);
    const someIsIndeterminate = _.some(isIndeterminate, Boolean);

    parent.isChecked = everyIsChecked;
    parent.isIndeterminate = someIsIndeterminate || !everyIsChecked && everyIsChecked !== someIsChecked;

    /**
     * Идем вверх
     */
    this.changeParent(parent);
  }

  /**
   * Метод возвращает чекбоксы всех
   * и только последних уровней
   */
  private searchChecked(): void {

    // все
    const all = _.filter(this.data, {isChecked: true});

    // последних уровней
    const lastLevel = _.reduce(all, (accumulator, item) => {
      const filter = _.filter(this.data, {parentId: item.id});
      if (_.size(filter) === 0) {
        accumulator.push(item);
      }

      return accumulator;
    }, []);

    // бросить событие
    this.changeCheckboxEvent.next({all, lastLevel});
  }
}
