# react-fielder

The library is intended to explore some patterns around form validation
in React.

### Field

This is a core component that acts as the glue component for all Form Fields.
You can think of it as the _container-component_ which provides
the `value`, `onChange`, `error` props based on which
we render a _presentation-input-component_. This abstraction allows us to choose
our own presentation for the specific input controls, handle callbacks such as _value
changes_, and even choose our own _validation mechanisms_! 

- `label`: PropTypes.string
- `value`: PropTypes.any.isRequired,
- `onChange`: PropTypes.func.isRequired,
- `onBlur`: PropTypes.func,
- `error`: PropTypes.shape({
    message: PropTypes.string
}),
- `visible`: PropTypes.bool,
- `disabled`: PropTypes.bool,
- `children`: PropTypes.func.isRequired,

Normally, the `value` comes from the outside, either from a Redux or MobX store. User interactions
will result in the `onChange` callbacks being fired from the specific _input-control_. This
is then propagated via the callback passed into the `Field`. The callback is way of
updating the input value in the store.

**Note** The `children` prop is a regular function that will be called to render
the _presentation-input-component_. This is a pattern explained well in this [Medium Post](https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9).

#### Handling Form Validation

Now this leaves an open question about _Form Validation_. How should one approach it?

Validation can be done as a reaction to the value change. This can be applied:

- **Immediately**: as part of the `onChange` callback
- **On Focus Change**: as part of the `onBlur` callback
- **Explicitly**: by invoking directly. This could at the beginning or on explicit
events like form submission. 

The purpose of the validation routine is to set the `error` prop on the Field. The
validation itself could be synchronous or asynchronous.

### Value Transformation

When you need some type guarantees on the input values, you can choose to wrap an Input control
with a transformation function. This HOC wrapper will transform values bi-directionally,
always ensuring the type of the input-value.

`withInputTransform(Component, fromValueFn, toValueFn)` is our HOC wrapper for doing
this transformation.

- `Component`: This is the Input control that renders the input
- `fromValueFn`: transforms from the _typed-value_ to something suitable for rendering purposes. 
You can also use this for formatting the input values.
- `toValueFn`: transforms from the _rendered-value_ to a type-safe value. This removes all formatting and brings the value back to its original type. 

Eg:

```js
export const NumberInput = withInputTransform(
    TextInput, 
    value => String(value), 
    value => Number(value)
);

```
### Example Usage

Let's say we have a special `<TextInput />` that we would like to use. Since its part of 
a third party library, we don't have direct control over it. 

Specifically, its props are named differently:

- `textValue` contains the **value**
- `onTextChange` is the **onChange** callback.

Rest of the props are named as per our `Field` component.

We can still use it like so:

```jsx harmony
<Field label="Message"
       visible={true}
       value={this.state.text}
       error={this.state.error}
       onChange={this.onInputChange}>
    {
        (props) => (<TextInput textValue={props.value}
                        onTextChange={props.onChange} 
                        {...props} />)
    }
</Field>
```

Note that the passed in child is a `function` that adapts to the interface of the
third party control.

Inside our application, we have a simple validation rule that flags the `Field` as erroneous
if the text contains the word "_error_". Currently, it's
being done immediately, but it could easily be triggered as part of the `onBlur`. 

The important thing to note is that the application controls the validation strategy. It is
responsible for setting the `error`, if the validation fails. The Field does not own
validation but takes on **the responsibility of showing errors**.
