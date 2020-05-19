import { Inject, Injectable } from '@angular/core';
import { WINDOW } from '../../custom/window.service';

@Injectable()
export class CheckboxTreeService {

  /**
   * Имя переменной в localStorage
   */
  private readonly localStorageKey: string = 'CheckboxTreeConf';

  constructor(@Inject(WINDOW) protected window) {
    //
  }

  /**
   * Подготовка и хранение данных в localStorage
   */
  public localStorageBuilder(data: CheckboxTreeNode[]): void {

    const res = [];
    const filter = _.filter(data, (o: CheckboxTreeNode) => o.isOpen || o.isChecked);

    _.forEach(filter, (o: CheckboxTreeNode) => {
      res.push({
        id: o.id,
        i: _.toNumber(o.isIndeterminate),
        o: _.toNumber(o.isOpen),
        c: _.toNumber(o.isChecked),
      })
    });

    if (_.size(res) === 0) {
      this.window.localStorage.removeItem(this.localStorageKey);
      return;
    }

    this.window.localStorage.setItem(this.localStorageKey, JSON.stringify(res));
  }

  /**
   * Читаем localStorage
   */
  public localStorageReader(data: CheckboxTreeNode[]): void {
    const storage = this.window.localStorage.getItem(this.localStorageKey);

    if (_.isNil(storage)) {
      return;
    }

    try {
      const conf = JSON.parse(storage);

      _.map(data, (o: CheckboxTreeNode) => {
        const nodeConf = _.find(conf, {id: o.id});

        if (nodeConf) {
          o.isIndeterminate = !!nodeConf.i;
          o.isOpen = !!nodeConf.o;
          o.isChecked = !!nodeConf.c;
        }
      });
    } catch (e) {
      throw new Error('Error processing local storage config: ' + e);
    }
  }

  /**
   * Готовим дерево элементов
   * @param data
   */
  public buildTree(data: CheckboxTreeNode[]): CheckboxTreeNode[] {
    return arrayToTree(data, {
      parentProperty: 'parentId',
    });
  }

  /**
   * Проверка входных данных
   * @param data
   */
  public checkInputData(data: CheckboxTreeNode[]): void {
    const arr = _.map(data, 'id');
    const is = _.every(arr, (value: any) => typeof value === 'string' || typeof value === 'number');

    if (!is) {
      throw new Error(`The item ID must be of type string or number.`);
    }

    const duplicate = _.filter(arr, (item, index) => _.indexOf(arr, item) !== index);

    if (duplicate.length) {
      throw new Error(`The item ID must be unique. Duplicate found: ${duplicate}`);
    }
  }
}
