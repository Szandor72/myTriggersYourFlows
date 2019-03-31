({
    convertToTree: function (logEntries, isInit) {
        var items;
        setIdAndParentId(logEntries);
        var treeItemList = convertToTreeItems(logEntries);
        items = list_to_tree(treeItemList);
        return items;
        
        function setIdAndParentId(entries) {
            var mapLevelToEntries = {};
            var i = 0;
            for (i; i < entries.length; i++) {
                var logEntry = entries[i];
                logEntry.id = i;
                if (!mapLevelToEntries.hasOwnProperty(logEntry.level)) {
                    mapLevelToEntries[logEntry.level] = {};
                    mapLevelToEntries[logEntry.level].logEntries = [];
                    mapLevelToEntries[logEntry.level].logEntries.push(logEntry);
                } else {
                    mapLevelToEntries[logEntry.level].logEntries.push(logEntry);
                }
            }
            //console.log("dealing with level " + logEntry.level);
            //console.log(JSON.stringify(mapLevelToEntries));
            
            for (i = 0; i < entries.length; i++) {
                var entry = entries[i];
                if (entry.level === 0) {
                    entry.parentId = 0;
                }
                if (mapLevelToEntries.hasOwnProperty(entry.level - 1)) {
                    var possibleParents = mapLevelToEntries[entry.level - 1].logEntries;
                    var n = 0;
                    for (n; n < possibleParents.length; n++) {
                        var possibleParent = possibleParents[n];
                        if (entry.id > possibleParent.id) {
                            entry.parentId = possibleParent.id;
                        }
                    }
                } else {
                    entry.parentId = 0;
                }
            }
        }
        
        function convertToTreeItems(entries) {
            var treeItems = [];
            for (var i = 0; i < entries.length; i++) {
                var label = '';
                var entry = entries[i];
                if ($A.util.isEmpty(entry.description)) {
                    label = entry.className + '.' + entry.methodName + ' ' + entry.line + ',' + entry.column;
                } else {
                    label = '"'+entry.description+'"' + ' ' + entry.className + '.' + entry.methodName;
                }
                var item = {
                    "label": label,
                    "name": entry.id + '',
                    "parentId": entry.parentId + '',
                    "items": []
                };
                if(isInit) {
                    item.expanded =  entry.description.length > 0 ? true : false;
                } else {
                    item.expanded = entry.expanded;
                }
                treeItems.push(item);
            }
            return treeItems;
        }
        
        function list_to_tree(list) {
            var map = {}, node, roots = [], i;
            for (i = 0; i < list.length; i += 1) {
                map[list[i].name] = i; // initialize the map
            }
            for (i = 0; i < list.length; i += 1) {
                node = list[i];
                if (node.parentId !== '0' && map[node.parentId] && list[map[node.parentId]].items) {
                    // if you have dangling branches check that map[node.parentId] exists
                    list[map[node.parentId]].items.push(node);
                } else {
                    roots.push(node);
                }
            }
            return roots;
        }
    },
    
    toggleExpand : function(component) {
        var entry = component.get("v.debugEntry")
        if($A.util.isUndefinedOrNull(entry)) {
            return;
        }
        var json = entry.logEntryJSON__c;
        var logEntries = JSON.parse(json);
        var expanded = component.get("v.expanded");
        logEntries.forEach(function (item){
            item.expanded = expanded; 
        });
        var items = this.convertToTree(logEntries, false);
        component.set('v.items', items);
        component.set("v.expanded", !expanded);
    }
})