const OFF = false;
const ERROR = true;

module.exports = {
	'rules': {
		'class-name': ERROR,
		'comment-format': [ERROR, 'check-space'],
		'curly': ERROR,
		'eofline': OFF,
		'forin': ERROR,
		'indent': [ERROR, 'spaces'],
		'label-position': ERROR,
		'label-undefined': ERROR,
		'max-line-length': [ERROR, 120],
		'member-access': OFF,
		'member-ordering': [OFF],
		'no-arg': ERROR,
		'no-bitwise': OFF,
		'no-console': [OFF],
		'no-construct': ERROR,
		'no-debugger': ERROR,
		'no-duplicate-key': ERROR,
		'no-duplicate-variable': ERROR,
		'no-empty': ERROR,
		'no-eval': ERROR,
		'no-inferrable-types': ERROR,
		'no-shadowed-variable': ERROR,
		'no-string-literal': OFF,
		'no-switch-case-fall-through': ERROR,
		'no-trailing-whitespace': ERROR,
		'no-unused-expression': ERROR,
		'no-unused-variable': ERROR,
		'no-unreachable': ERROR,
		'no-use-before-declare': ERROR,
		'no-var-keyword': ERROR,
		'object-literal-sort-keys': ERROR,
		'one-line': [ERROR,
			'check-open-brace',
			'check-catch',
			'check-else',
			'check-finally',
			'check-whitespace'
		],
		'quotemark': [ERROR, 'double', 'avoid-escape'],
		'radix': ERROR,
		'semicolon': [ERROR],
		'trailing-comma': [OFF, {
			'singleline': 'never',
			'multiline': 'always'
		}],
		'triple-equals': [ERROR, 'allow-null-check'],
		'typedef-whitespace': [ERROR, {
			'call-signature': 'nospace',
			'index-signature': 'nospace',
			'parameter': 'nospace',
			'property-declaration': 'nospace',
			'variable-declaration': 'nospace'
		}],
		'variable-name': OFF,
		'whitespace': [ERROR,
			'check-branch',
			'check-decl',
			'check-operator',
			'check-separator',
			'check-type'
		]
	}
};