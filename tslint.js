const OFF = false;
const ERROR = true;

module.exports = {
	'rules': {
		'align': [
			true,
			'parameters',
			'arguments',
			'statements'
		],
		'ban': [
			ERROR,
			[ '_', 'forEach' ],
			[ '_', 'each' ],
			[ '$', 'each' ],
			[ 'angular', 'forEach' ]
		],
		'class-name': ERROR,
		'comment-format': [ERROR, 'check-space', 'check-lowercase'],
		'curly': ERROR,
		'eofline': OFF,
		'forin': ERROR,
		'indent': [ERROR, 'spaces'],
		'label-position': ERROR,
		'label-undefined': ERROR,
		'max-line-length': [ ERROR, 140],
		'member-access': OFF,
		'member-ordering': [OFF],
		'no-arg': ERROR,
		'no-bitwise': OFF,
		'no-console': [ ERROR, 'info', 'time', 'timeEnd', 'trace'],
		'no-construct': ERROR,
		'no-debugger': ERROR,
		'no-duplicate-key': ERROR,
		'no-duplicate-variable': ERROR,
		'no-empty': ERROR,
		'no-eval': ERROR,
		'no-inferrable-types': ERROR,
		'new-parens': ERROR,
		'no-mergeable-namespace': ERROR,
		'no-shadowed-variable': ERROR,
		'no-string-literal': OFF,
		'no-switch-case-fall-through': ERROR,
		'no-trailing-whitespace': ERROR,
		'no-unused-expression': ERROR,
		'no-unused-variable': ERROR,
		'no-unreachable': ERROR,
		'no-use-before-declare': ERROR,
		'no-var-keyword': ERROR,
		'no-var-requires': ERROR,
		'object-literal-sort-keys': ERROR,
		'one-line': [ERROR,
			'check-open-brace',
			'check-catch',
			'check-else',
			'check-finally',
			'check-whitespace'
		],
		'one-variable-per-declaration': [ERROR,
			'ignore-for-loop'
		],
		'quotemark': [ERROR, 'single', 'avoid-escape'],
		'radix': ERROR,
		'semicolon': [ERROR, 'always'],
		'switch-default': ERROR,
		'trailing-comma': [OFF, {
			'singleline': 'never',
			'multiline': 'always'
		}],
		'triple-equals': [ERROR, 'allow-null-check', 'allow-undefined-check'],
		'typedef': [
			true,
			'call-signature',
			'parameter',
			'arrow-parameter',
			'property-declaration',
			'variable-declaration',
			'member-variable-declaration'
		],
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