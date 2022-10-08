import { MaybeOptions } from '@/@types/options';
import { FormItemProps, FormItemRule } from 'element-plus';
import { getOptions } from '@/api/options';

type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

interface InputParams {
  prop: string;
  label?: string;
  form?: Record<string, any>;
  input?: Record<string, any>;
  defaultValue?: any;
  required?: boolean;
}

export class Input {
  public form!: Writable<Partial<FormItemProps>>;

  public input: Record<string, any>;

  constructor({ prop, label, defaultValue, form, input }: InputParams) {
    this.form = { ...(form || {}), prop, label };
    this.input = { ...(input || {}), defaultValue };
  }
}

const mergeRules = (
  rules: FormItemRule | Array<FormItemRule> | undefined,
  item: FormItemRule
): Array<FormItemRule> => {
  let result: Array<FormItemRule> = [];
  if (rules) {
    if (Array.isArray(rules)) {
      result = rules;
    } else {
      result = [rules];
    }
  }
  result.unshift(item);
  return result;
};

export class SimpleInput extends Input {
  constructor(data: InputParams) {
    super(data);
    this.input = {
      placeholder: `请输入${data.label}`,
      maxlength: 100,
      ...this.input,
      component: 'ElInput',
    };
    if (data.required) {
      this.form.rules = mergeRules(this.form.rules, {
        required: true,
        trigger: 'blur',
        message: `请输入${data.label}`,
      });
    }
  }
}

export class NumberInput extends Input {
  static POSITIVE_INTEGER = { min: 1, precision: 0 };

  static NATURAL_NUMBER = { min: 0, precision: 0 };

  constructor(data: InputParams) {
    super(data);

    this.input.component = 'NumberInput';

    if (!this.input.defaultValue && this.input.defaultValue != null) {
      this.input.defaultValue = undefined;
    }

    if (data.required) {
      this.form.rules = mergeRules(this.form.rules, {
        required: true,
        trigger: 'blur',
        type: 'number',
        message: `请输入${data.label}`,
      });
    }
  }
}

// 文本域
export class TextAreaInput extends SimpleInput {
  constructor(data: InputParams) {
    super(data);

    this.input = {
      type: 'textarea',
      'show-word-limit': true,
      ...this.input,
      maxlength: data.input?.maxlength || 200,
    };
  }
}

// 密码
export class PasswordInput extends SimpleInput {
  constructor(data: InputParams) {
    super(data);

    this.input = {
      ...this.input,
      showPassword: true,
      autocomplete: 'new-password',
    };
  }
}

interface SelectInputParams extends InputParams {
  dictKey?: string;
  options?: MaybeOptions;
  // eslint-disable-next-line no-unused-vars
  remoteMethod?: (...args: any) => MaybeOptions;
}

// 下拉选择
export class SelectInput extends Input {
  static BOOL_OPTIONS = [
    { label: '是', value: '1' },
    { label: '否', value: '0' },
  ];

  constructor(data: SelectInputParams) {
    super(data);

    this.input = {
      placeholder: `请选择${data.label}`,
      clearable: true,
      component: 'SelectInput',
      options: data.dictKey ? getOptions(data.dictKey) : data.options,
      remoteMethod: data.remoteMethod,
      ...this.input,
    };

    // if (this.value === undefined) {
    //   this.value = null;
    // }

    if (data.required) {
      this.form.rules = mergeRules(this.form.rules, {
        required: true,
        trigger: 'change',
        message: `请选择${data.label}`,
      });
    }
  }
}
