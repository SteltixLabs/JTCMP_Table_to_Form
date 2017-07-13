define(['knockout'], 
    function(ko) {
        function model(context) {
                var self = this;
                
                /* This component shares some code with the filter-table component
                 * However, internally it represents the data differently */
                
                self.filteredTable = ko.observableArray();
                self.filterBy = ko.observable("");
                self.noCells = ko.observable(false);
            
                self.cellData = [];
                
                self.currentRow = ko.observable(0);
                
                self.selectRow = function(selected) {
                    self.currentRow(selected());
                };
                
                
                /* filterTable isn't referenced from the view.
                 * Knockout didn't like it when I tried to make filterTable a regular function, called from the search onInput event.
                 * This is a workaround - a computed function is called whenever the observables it references are updated,
                 * i.e. every time self.filterBy changes, then this function is called */
                self.filterTable = ko.computed(function() {
                    var filter = self.filterBy();
                    var nocells = true; // Assume that no cells match the input, and change this later if wrong
                    
                    for (var i in self.cellData) {
                        for (var j in self.cellData[i].cells) {
                            if (self.cellData[i].cells[j]().toLowerCase().indexOf(filter.toLowerCase()) > -1) { //if the cell contains the search term as a substring
                                self.cellData[i].visibility(1);
                                nocells = false;
                                break;
                            } else {
                                self.cellData[i].visibility(0)
                            }
                        }
                    }
                    
                    self.noCells(nocells);
                });

                context.props.then(function(properties) {
                    if (properties.rows) {
                        self.rows = properties.rows;
                        for (var i in self.rows) {
                            var row = {
                                cells: [],
                                visibility: ko.observable(1)
                            };
                            for (var j in self.rows[i]) {
                                    row.cells.push(ko.observable(self.rows[i][j]));
                            }
                            self.cellData.push(row);
                        }
                        self.filterBy(properties.filter);
                        self.header = properties.header;
                        self.noCells(false);

                    }
                });
                

        }
    return model;
});
