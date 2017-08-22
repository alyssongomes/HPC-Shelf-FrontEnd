/*
Classe responsável pela conversão do workflow pra estruturas equivalentes, permitindo a interoperabilidade
entre as bibliotecas.
Ex.:
Obj Jsonix -> Obj zTree
        OU
Obj Jsonix <- Obj zTree
*/

class Workflow{
    
    static toZtree(work, identify){
        if(work.sequenceOper != undefined){
            var sequence = {
                pid:identify.counter,
                id:identify.counter++,
                iconOpen:"../../../img/sequence.png",
                iconClose:"../../../img/sequence.png",
                icon:"../../../img/sequence.png",
                name:"sequence_oper",
                open:true,
                drag:true,
                children: [],
                properties:{
                    base:{
                        order: work.sequenceOper.order != undefined? work.sequenceOper.order:null,
                        value:work.sequenceOper.value != undefined? work.sequenceOper.value:null,
                        oper_name:work.sequenceOper.operName != undefined? work.sequenceOper.operName:null,
                        level: work.sequenceOper.level != undefined? work.sequenceOper.level:null,
                        base_label:work.sequenceOper.baseLabel != undefined?work.sequenceOper.baseLabel:null 
                    }
                }
            };
            for(var i = 0; i < work.sequenceOper.operation.length; i++)
                sequence.children.push(Workflow.toZtree(work.sequenceOper.operation[i], identify));
            return sequence;
        }if(work.parallelOper != undefined){
            var parallel = {
                id: identify.counter++,
                iconOpen:"../../../img/parallel.png",
                iconClose:"../../../img/parallel.png",
                icon:"../../../img/parallel.png",
                name:"parallel_oper",
                open:true,
                drag:true,
                children: [],
                properties:{
                    base:{
                        order: work.parallelOper.order != undefined? work.parallelOper.order:null,
                        value:work.parallelOper.value != undefined? work.parallelOper.value:null,
                        oper_name:work.parallelOper.operName != undefined? work.parallelOper.operName:null,
                        level: work.parallelOper.level != undefined? work.parallelOper.level:null,
                        base_label:work.parallelOper.baseLabel != undefined?work.parallelOper.baseLabel:null 
                    }
                }
            };
            for(var i = 0; i < work.parallelOper.operation.length; i++)
                parallel.children.push(Workflow.toZtree(work.parallelOper.operation[i],identify));
            return parallel;
        }if(work.iterateOper != undefined){
            var iterate = {
                pid:identify.counter,
                id: identify.counter++,
                iconOpen:"../../../img/iterator.png",
                iconClose:"../../../img/iterator.png",
                icon:"../../../img/iterator.png",
                name:"iterate_oper",
                open:true,
                drag:true,
                children: [],
                properties:{
                    base:{
                        order: work.iterateOper.order != undefined? work.iterateOper.order:null,
                        value:work.iterateOper.value != undefined? work.iterateOper.value:null,
                        oper_name:work.iterateOper.operName != undefined? work.iterateOper.operName:null,
                        level: work.iterateOper.level != undefined? work.iterateOper.level:null,
                        base_label:work.iterateOper.baseLabel != undefined?work.iterateOper.baseLabel:null 
                    },
                    iterate:{
                        max:work.iterateOper.max,
                        iterLabel:work.iterateOper.iterLabel
                    }
                }
            };
            for(var i = 0; i < work.iterateOper.operation.length; i++)
                iterate.children.push(Workflow.toZtree(work.iterateOper.operation[i],identify));
            return iterate;
        }else if(work.invokeOper != undefined){
            var invoke = {
                pid:identify.counter,
                id: identify.counter++,
                iconOpen:"../../../img/invoke.png",
                iconClose:"../../../img/invoke.png",
                icon:"../../../img/invoke.png",
                name:"invoke_oper",
                open:true,
                drag:true,
                children: [],
                properties:{
                    base:{
                        order: work.invokeOper.order != undefined? work.invokeOper.order:null,
                        value:work.invokeOper.value != undefined? work.invokeOper.value:null,
                        oper_name:work.invokeOper.operName != undefined? work.invokeOper.operName:null,
                        level: work.invokeOper.level != undefined? work.invokeOper.level:null,
                        base_label:work.invokeOper.baseLabel != undefined? work.invokeOper.baseLabel:null 
                    },
                    invoke:{
                        action: work.invokeOper.action,
                        componentId: work.invokeOper.id,
                    }
                }
            }
            if(work.invokeOper.arg != undefined)
                for(var i = 0; i < work.invokeOper.arg.length; i++)
                    invoke.children.push(Workflow.toZtree(work.invokeOper.arg[i],identify));
            return invoke;
        }else if(work.TYPE_NAME === "org_example_safe_workflow_v4.ArgType"){
            return {pid:identify.counter,id:identify.counter++,icon:"../../../img/arg.png",name: "arg",drag:true, properties:{arg:{type:work.type,value:work.value}}};
        }else if(work.breakOper){
            var breakOper = {
                pid:identify.counter,
                id: identify.counter++,
                iconOpen:"../../../img/break.png",
                iconClose:"../../../img/break.png",
                icon:"../../../img/break.png",
                name:"break_oper",
                drag:true,
                properties:{
                    base:{
                        order: work.breakOper.order != undefined? work.breakOper.order:null,
                        value:work.breakOper.value != undefined? work.breakOper.value:null,
                        oper_name:work.breakOper.operName != undefined? work.breakOper.operName:null,
                        level: work.breakOper.level != undefined? work.breakOper.level:null,
                        base_label:work.breakOper.baseLabel != undefined?work.breakOper.baseLabel:null  
                    }
                }
            }
            return breakOper;
        }else if(work.skipOper){
            var skip = {
                pid:identify.counter,
                id: identify.counter++,
                iconOpen:"../../../img/skip.png",
                iconClose:"../../../img/skip.png",
                icon:"../../../img/skip.png",
                name:"skip_oper",
                drag:true,
                properties:{
                    base:{
                        order: work.skipOper.order != undefined? work.skipOper.order:null,
                        value:work.skipOper.value != undefined? work.skipOper.value:null,
                        oper_name:work.skipOper.operName != undefined? work.skipOper.operName:null,
                        level: work.skipOper.level != undefined? work.skipOper.level:null,
                        base_label:work.skipOper.baseLabel != undefined?work.skipOper.baseLabel:null  
                    }
                }
            }
            return skip;
        }else if(work.continueOper){
            var continueOper = {
                pid:identify.counter,
                id: identify.counter++,
                iconOpen:"../../../img/continue.png",
                iconClose:"../../../img/continue.png",
                icon:"../../../img/continue.png",
                name:"continue_oper",
                drag:true,
                properties:{
                    base:{
                        order: work.continueOper.order != undefined? work.continueOper.order:null,
                        value:work.continueOper.value != undefined? work.continueOper.value:null,
                        oper_name:work.continueOper.operName != undefined? work.continueOper.operName:null,
                        level: work.continueOper.level != undefined? work.continueOper.level:null,
                        base_label:work.continueOper.baseLabel != undefined?work.continueOper.baseLabel:null  
                    }
                }
            }
            return continueOper;
        }else if(work.startOper){
            var start = {
                pid:identify.counter,
                id: identify.counter++,
                iconOpen:"../../../img/start.png",
                iconClose:"../../../img/start.png",
                icon:"../../../img/start.png",
                name:"start_oper",
                open:true,
                drag:true,
                children:[],
                properties:{
                    base:{
                        order: work.startOper.order != undefined? work.startOper.order:null,
                        value:work.startOper.value != undefined? work.startOper.value:null,
                        oper_name:work.startOper.operName != undefined? work.startOper.operName:null,
                        level: work.startOper.level != undefined? work.startOper.level:null,
                        base_label:work.startOper.baseLabel != undefined? work.startOper.baseLabel:null 
                    },
                    primitive:{
                        handleId: work.startOper.handleId
                    }
                }
            }            
            start.children.push(Workflow.toZtree(work.startOper.action,identify));
            return start;
        }else if(work.TYPE_NAME === "org_example_safe_workflow_v4.XMLSAFeAction"){
            var action = {
                pid:identify.counter,
                id: identify.counter++,
                iconOpen:"../../../img/action.png",
                iconClose:"../../../img/action.png",
                icon:"../../../img/action.png",
                name:"action",
                open:true,
                drag:true,
                children:[],
                properties:{
                    base:{
                        order: work.order != undefined? work.order:null,
                        value:work.value != undefined? work.value:null,
                        oper_name:work.operName != undefined? work.operName:null,
                        level: work.level != undefined? work.level:null,
                        base_label:work.baseLabel != undefined? work.baseLabel:null 
                    },
                    action:{
                        action: work.action,
                        componentId: work.id
                    }
                }
            }
            if(work.arg != undefined)
                for(var i = 0; i < work.arg.length; i++)
                    action.children.push(Workflow.toZtree(work.arg[i],identify));
            return action;
        }else if(work.waitOper){
            var wait = {
                pid:identify.counter,
                id: identify.counter++,
                iconOpen:"../../../img/wait.png",
                iconClose:"../../../img/wait.png",
                icon:"../../../img/wait.png",
                name:"wait_oper",
                open:true,
                drag:true,
                children:[],
                properties:{
                    base:{
                        order: work.waitOper.order != undefined? work.waitOper.order:null,
                        value:work.waitOper.value != undefined? work.waitOper.value:null,
                        oper_name:work.waitOper.operName != undefined? work.waitOper.operName:null,
                        level: work.waitOper.level != undefined? work.waitOper.level:null,
                        base_label:work.waitOper.baseLabel != undefined? work.waitOper.baseLabel:null 
                    },
                    primitive:{
                        handleId: work.waitOper.handleId
                    }
                }
            }            
            wait.children.push(Workflow.toZtree(work.waitOper.action,identify));
            return wait;
        }else if(work.cancelOper){
            var cancel = {
                pid:identify.counter,
                id: identify.counter++,
                iconOpen:"../../../img/cancel.png",
                iconClose:"../../../img/cancel.png",
                icon:"../../../img/cancel.png",
                name:"cancel_oper",
                open:true,
                drag:true,
                children:[],
                properties:{
                    base:{
                        order: work.cancelOper.order != undefined? work.cancelOper.order:null,
                        value:work.cancelOper.value != undefined? work.cancelOper.value:null,
                        oper_name:work.cancelOper.operName != undefined? work.cancelOper.operName:null,
                        level: work.cancelOper.level != undefined? work.cancelOper.level:null,
                        base_label:work.cancelOper.baseLabel != undefined? work.cancelOper.baseLabel:null 
                    },
                    primitive:{
                        handleId: work.cancelOper.handleId
                    }
                }
            }            
            cancel.children.push(Workflow.toZtree(work.cancelOper.action,identify));
            return cancel;
        }else if(work.choiceOper){
            var choice = {
                pid:identify.counter,
                id: identify.counter++,
                iconOpen:"../../../img/choice.png",
                iconClose:"../../../img/choice.png",
                icon:"../../../img/choice.png",
                name:"choice_oper",
                open:true,
                drag:true,
                children: [],
                properties:{
                    base:{
                        order: work.choiceOper.order != undefined? work.choiceOper.order:null,
                        value:work.choiceOper.value != undefined? work.choiceOper.value:null,
                        oper_name:work.choiceOper.operName != undefined? work.choiceOper.operName:null,
                        level: work.choiceOper.level != undefined? work.choiceOper.level:null,
                        base_label:work.choiceOper.baseLabel != undefined?work.choiceOper.baseLabel:null 
                    },
                    choice:{
                        chosen:work.choiceOper.chosen,
                    }
                }
            };
            for(var i = 0; i < work.choiceOper.select.length; i++)
                choice.children.push(Workflow.toZtree(work.choiceOper.select[i],identify));
            return choice;
        }else if(work.TYPE_NAME === "org_example_safe_workflow_v4.Select"){
            var select = {
                pid:identify.counter,
                id: identify.counter++,
                iconOpen:"../../../img/select.png",
                iconClose:"../../../img/select.png",
                icon:"../../../img/select.png",
                name:"select",
                open:true,
                drag:true,
                children: [],
                properties:{
                    base:{
                        order: work.order != undefined? work.order:null,
                        value:work.value != undefined? work.value:null,
                        oper_name:work.operName != undefined? work.operName:null,
                        level: work.level != undefined? work.level:null,
                        base_label:work.baseLabel != undefined?work.baseLabel:null 
                    },
                    select:{
                        actionId :work.actionId,
                    }
                }
            }
            for(var i = 0; i < work.operation.length; i++)
                select.children.push(Workflow.toZtree(work.operation[i],identify));
            return select;
        }
    }
    
    static toJsonix(work){
        if(work.name === "sequence_oper"){
            var root = {};
            root.sequenceOper = {
                order: work.properties.base.order,
                value:work.properties.base.value,
                oper_name:work.properties.base.oper_name,
                level: work.properties.base.level,
                base_label:work.properties.base.base_label,
                operation : []
            }
            for(var i=0; i<work.children.length;i++){
                root.sequenceOper.operation.push(Workflow.toJsonix(work.children[i]));
            }
            return root;
        }else if(work.name === "parallel_oper"){
            var root = {};
            root.parallelOper = {
                order: work.properties.base.order,
                value:work.properties.base.value,
                oper_name:work.properties.base.oper_name,
                level: work.properties.base.level,
                base_label:work.properties.base.base_label,
                operation : []
            }
            for(var i=0; i<work.children.length;i++){
                parallelOper.operation.push(Workflow.toJsonix(work.children[i]));
            }
            return root;
        }else if(work.name === "iterate_oper"){
            var root = {};
            root.iterateOper = {
                order: work.properties.base.order,
                value:work.properties.base.value,
                oper_name:work.properties.base.oper_name,
                level: work.properties.base.level,
                base_label:work.properties.base.base_label,
                max: work.properties.iterate.max,
                iterLabel: work.properties.iterate.iterLabel,
                operation : []
            }
            for(var i=0; i<work.children.length;i++){
                root.iterateOper.operation.push(Workflow.toJsonix(work.children[i]));
            }
            return root;
        }else if(work.name === "invoke_oper"){
            var root = {};
            root.invokeOper = {
                order: work.properties.base.order,
                value:work.properties.base.value,
                oper_name:work.properties.base.oper_name,
                level: work.properties.base.level,
                base_label:work.properties.base.base_label,
                action: work.properties.invoke.action,
                id: ""+work.properties.invoke.componentId,
                arg : []
            }
            if(work.children != undefined)
                for(var i=0; i<work.children.length;i++)
                    root.invokeOper.arg.push(Workflow.toJsonix(work.children[i]));    
            return root;
        }else if(work.name === "arg"){
            var arg = {
                type: work.properties.arg.type,
                value:work.properties.arg.value
            }
            return arg;
        }else if(work.name === "choice_oper"){
            var root = {};
            root.choiceOper = {
                order: work.properties.base.order,
                value:work.properties.base.value,
                oper_name:work.properties.base.oper_name,
                level: work.properties.base.level,
                base_label:work.properties.base.base_label,
                chosen: work.properties.choice.chosen,
                select : []
            }
            for(var i=0; i<work.children.length;i++){
                root.choiceOper.select.push(Workflow.toJsonix(work.children[i]));
            }
            return root;
        }else if(work.name === "select"){
            var select = {
                order: work.properties.base.order,
                value:work.properties.base.value,
                oper_name:work.properties.base.oper_name,
                level: work.properties.base.level,
                base_label:work.properties.base.base_label,
                actionId: work.properties.select.actionId,
                operation : []
            }
            for(var i=0; i<work.children.length;i++){
                select.operation.push(Workflow.toJsonix(work.children[i]));
            }
            return select;
        }else if(work.name === "start_oper"){
            var root = {};
            root.startOper = {
                order: work.properties.base.order,
                value:work.properties.base.value,
                oper_name:work.properties.base.oper_name,
                level: work.properties.base.level,
                base_label:work.properties.base.base_label,
                handleId: work.properties.primitive.handleId,
                action : null
            }
            root.startOper.action = Workflow.toJsonix(work.children[0]);
            console.log(root.startOper);
            return root;
        }else if(work.name === "action"){
            var action = {
                order: work.properties.base.order,
                value:work.properties.base.value,
                oper_name:work.properties.base.oper_name,
                level: work.properties.base.level,
                base_label:work.properties.base.base_label,
                action: work.properties.action.action,
                id: ""+work.properties.action.componentId,
                arg : []
            }
            if(work.children != undefined)
                for(var i=0; i<work.children.length;i++)
                    action.arg.push(Workflow.toJsonix(work.children[i]));
            return action;
        }else if(work.name === "wait_oper"){
            var root = {};
            root.waitOper = {
                order: work.properties.base.order,
                value:work.properties.base.value,
                oper_name:work.properties.base.oper_name,
                level: work.properties.base.level,
                base_label:work.properties.base.base_label,
                handleId: work.properties.primitive.handleId,
                action : []
            }
            root.waitOper.action = Workflow.toJsonix(work.children[0]);
            return root;
        }else if(work.name === "cancel_oper"){
            var root = {};
            root.cancelOper = {
                order: work.properties.base.order,
                value:work.properties.base.value,
                oper_name:work.properties.base.oper_name,
                level: work.properties.base.level,
                base_label:work.properties.base.base_label,
                handleId: work.properties.primitive.handleId,
                action : []
            }
            root.cancelOper.action = Workflow.toJsonix(work.children[0]);
            return root;
        }else if(work.name === "break_oper"){
            var root = {};
            root.breakOper = {
                order: work.properties.base.order,
                value:work.properties.base.value,
                oper_name:work.properties.base.oper_name,
                level: work.properties.base.level,
                base_label:work.properties.base.base_label
            }
            return root;
        }else if(work.name === "skip_oper"){
            var root = {};
            root.skipOper = {
                order: work.properties.base.order,
                value:work.properties.base.value,
                oper_name:work.properties.base.oper_name,
                level: work.properties.base.level,
                base_label:work.properties.base.base_label
            }
            return root;
        }else if(work.name === "continue_oper"){
            var root = {};
            root.continueOper = {
                order: work.properties.base.order,
                value:work.properties.base.value,
                oper_name:work.properties.base.oper_name,
                level: work.properties.base.level,
                base_label:work.properties.base.base_label
            }
            return root;
        }
    }

}