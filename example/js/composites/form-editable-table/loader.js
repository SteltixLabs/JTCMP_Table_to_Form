define(['ojs/ojcore', 'text!./form-editable-table.html', './form-editable-table', 'text!./form-editable-table.json', 'css!./form-editable-table.css', 'ojs/ojcomposite'], function (oj, view, viewModel, metadata) {
        oj.Composite.register('form-editable-table', {
            view: {inline: view},
            viewModel: {inline: viewModel},
            metadata: {inline: JSON.parse(metadata)}
    });
    }   
);
