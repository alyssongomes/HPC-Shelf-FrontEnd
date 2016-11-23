var br_ufc_lia_storm = {
  name: 'br_ufc_lia_storm',
  defaultElementNamespaceURI: 'http:\/\/storm.lia.ufc.br',
  typeInfos: [{
      type: 'classInfo',
      localName: 'ContextContract',
      propertyInfos: [{
          type: 'element',
          name: 'contextArguments',
          collection: true,
          elementName: 'context_arguments',
          typeInfo: 'br_ufc_lia_storm.ContextArgumentType'
        }, {
          type: 'element',
          name: 'abstractComponent',
          elementName: 'abstract_component',
          typeInfo: 'br_ufc_lia_storm.AbstractComponentType'
        }, {
          type: 'element',
          name: 'platform',
          elementName: 'platform',
          typeInfo: 'br_ufc_lia_storm.PlatformProfileType'
        }, {
          type: 'element',
          name: 'qualityArguments',
          collection: true,
          elementName: 'quality_arguments',
          typeInfo: 'br_ufc_lia_storm.CalculatedArgumentType'
        }, {
          type: 'element',
          name: 'rankingArguments',
          collection: true,
          elementName: 'ranking_arguments',
          typeInfo: 'br_ufc_lia_storm.CalculatedArgumentType'
        }, {
          type: 'element',
          name: 'costArguments',
          collection: true,
          elementName: 'cost_arguments',
          typeInfo: 'br_ufc_lia_storm.CalculatedArgumentType'
        }, {
          type: 'element',
          name: 'innerComponentsResolved',
          collection: true,
          elementName: 'inner_components_resolved',
          typeInfo: 'br_ufc_lia_storm.CandidateListType'
        }, {
          type: 'element',
          name: 'innerComponents',
          collection: true,
          elementName: 'inner_components',
          typeInfo: 'br_ufc_lia_storm.ContextContract'
        }, {
          type: 'element',
          name: 'concreteUnits',
          collection: true,
          elementName: 'concrete_units',
          typeInfo: 'br_ufc_lia_storm.ConcreteUnitType'
        }, {
          type: 'element',
          name: 'contextArgumentsRequired',
          collection: true,
          elementName: 'context_arguments_required',
          typeInfo: 'br_ufc_lia_storm.ContextArgumentType'
        }, {
          name: 'ccName',
          typeInfo: 'String',
          attributeName: 'cc_name',
          type: 'attribute'
        }, {
          name: 'ccId',
          typeInfo: 'Int',
          attributeName: 'cc_id',
          type: 'attribute'
        }, {
          name: 'ownerId',
          typeInfo: 'Int',
          attributeName: 'owner_id',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'CandidateListType',
      propertyInfos: [{
          type: 'element',
          name: 'candidate',
          collection: true,
          elementName: 'candidate',
          typeInfo: 'br_ufc_lia_storm.ContextContract'
        }, {
          name: 'userId',
          typeInfo: 'Int',
          attributeName: 'user_id',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'UnitFileType',
      propertyInfos: [{
          name: 'filename',
          typeInfo: 'String',
          attributeName: 'filename',
          type: 'attribute'
        }, {
          name: 'extension',
          typeInfo: 'String',
          attributeName: 'extension',
          type: 'attribute'
        }, {
          name: 'buildCfg',
          typeInfo: 'String',
          attributeName: 'build_cfg',
          type: 'attribute'
        }, {
          name: 'version',
          typeInfo: 'Int',
          attributeName: 'version',
          type: 'attribute'
        }, {
          name: 'filetype',
          typeInfo: 'Int',
          attributeName: 'filetype',
          type: 'attribute'
        }, {
          name: 'uid',
          typeInfo: 'Int',
          attributeName: 'uid',
          type: 'attribute'
        }, {
          name: 'path',
          typeInfo: 'String',
          attributeName: 'path',
          type: 'attribute'
        }, {
          name: 'fileId',
          typeInfo: 'Int',
          attributeName: 'file_id',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'ConcreteUnitType',
      propertyInfos: [{
          name: 'uId',
          typeInfo: 'Int',
          attributeName: 'u_id',
          type: 'attribute'
        }, {
          name: 'auId',
          typeInfo: 'Int',
          attributeName: 'au_id',
          type: 'attribute'
        }, {
          name: 'ccId',
          typeInfo: 'Int',
          attributeName: 'cc_id',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'ContractList',
      propertyInfos: [{
          type: 'element',
          name: 'contract',
          collection: true,
          elementName: 'contract',
          typeInfo: 'br_ufc_lia_storm.ContextContract'
        }]
    }, {
      type: 'classInfo',
      localName: 'AbstractComponentType',
      propertyInfos: [{
          type: 'element',
          name: 'supertype',
          elementName: 'supertype',
          typeInfo: 'br_ufc_lia_storm.AbstractComponentType'
        }, {
          type: 'element',
          name: 'contextParameter',
          collection: true,
          elementName: 'context_parameter',
          typeInfo: 'br_ufc_lia_storm.ContextParameterType'
        }, {
          type: 'element',
          name: 'innerComponents',
          collection: true,
          elementName: 'inner_components',
          typeInfo: 'br_ufc_lia_storm.AbstractComponentType'
        }, {
          type: 'element',
          name: 'abstractUnit',
          collection: true,
          elementName: 'abstract_unit',
          typeInfo: 'br_ufc_lia_storm.AbstractUnitType'
        }, {
          type: 'element',
          name: 'qualityParameters',
          collection: true,
          elementName: 'quality_parameters',
          typeInfo: 'br_ufc_lia_storm.CalculatedParameterType'
        }, {
          type: 'element',
          name: 'costParameters',
          collection: true,
          elementName: 'cost_parameters',
          typeInfo: 'br_ufc_lia_storm.CalculatedParameterType'
        }, {
          type: 'element',
          name: 'rankingParameters',
          collection: true,
          elementName: 'ranking_parameters',
          typeInfo: 'br_ufc_lia_storm.CalculatedParameterType'
        }, {
          type: 'element',
          name: 'slices',
          collection: true,
          elementName: 'slices',
          typeInfo: 'br_ufc_lia_storm.SliceType'
        }, {
          name: 'name',
          typeInfo: 'String',
          attributeName: 'name',
          type: 'attribute'
        }, {
          name: 'kind',
          typeInfo: 'Int',
          attributeName: 'kind',
          type: 'attribute'
        }, {
          name: 'idAc',
          typeInfo: 'Int',
          attributeName: 'id_ac',
          type: 'attribute'
        }, {
          name: 'path',
          typeInfo: 'String',
          attributeName: 'path',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'ComputationalSystemType',
      propertyInfos: [{
          type: 'element',
          name: 'contextContract',
          elementName: 'context_contract',
          typeInfo: 'br_ufc_lia_storm.ContextContract'
        }, {
          type: 'element',
          name: 'port',
          collection: true,
          elementName: 'port',
          typeInfo: 'String'
        }, {
          type: 'element',
          name: 'files',
          collection: true,
          elementName: 'files',
          typeInfo: 'br_ufc_lia_storm.UnitFileType'
        }, {
          name: 'session',
          typeInfo: 'Int',
          attributeName: 'session',
          type: 'attribute'
        }, {
          name: 'networkAddress',
          typeInfo: 'String',
          attributeName: 'network_address',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'AbstractUnitType',
      propertyInfos: [{
          name: 'auName',
          typeInfo: 'String',
          attributeName: 'au_name',
          type: 'attribute'
        }, {
          name: 'acId',
          typeInfo: 'Int',
          attributeName: 'ac_id',
          type: 'attribute'
        }, {
          name: 'auId',
          typeInfo: 'Int',
          attributeName: 'au_id',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'CalculatedFunctionTermType',
      propertyInfos: [{
          name: 'order',
          typeInfo: 'Int',
          attributeName: 'order',
          type: 'attribute'
        }, {
          name: 'cpId',
          typeInfo: 'Int',
          attributeName: 'cp_id',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'PlatformProfileType',
      propertyInfos: [{
          type: 'element',
          name: 'platformContract',
          elementName: 'platform_contract',
          typeInfo: 'br_ufc_lia_storm.ContextContract'
        }, {
          name: 'networkIpAddress',
          typeInfo: 'String',
          attributeName: 'network_ip_address',
          type: 'attribute'
        }, {
          name: 'port',
          typeInfo: 'String',
          attributeName: 'port',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'CalculatedArgumentType',
      propertyInfos: [{
          type: 'element',
          name: 'function',
          elementName: 'function',
          typeInfo: 'br_ufc_lia_storm.CalculatedFunctionType'
        }, {
          name: 'calcId',
          typeInfo: 'Int',
          attributeName: 'calc_id',
          type: 'attribute'
        }, {
          name: 'value',
          typeInfo: 'Double',
          attributeName: 'value',
          type: 'attribute'
        }, {
          name: 'kindId',
          typeInfo: 'Int',
          attributeName: 'kind_id',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'CalculatedFunctionType',
      propertyInfos: [{
          type: 'element',
          name: 'functionParameters',
          collection: true,
          elementName: 'function_parameters',
          typeInfo: 'br_ufc_lia_storm.CalculatedFunctionTermType'
        }, {
          type: 'element',
          name: 'functionArguments',
          collection: true,
          elementName: 'function_arguments',
          typeInfo: 'br_ufc_lia_storm.ContextArgumentType'
        }, {
          name: 'functionId',
          typeInfo: 'Int',
          attributeName: 'function_id',
          type: 'attribute'
        }, {
          name: 'functionValue',
          typeInfo: 'String',
          attributeName: 'function_value',
          type: 'attribute'
        }, {
          name: 'ccId',
          typeInfo: 'Int',
          attributeName: 'cc_id',
          type: 'attribute'
        }, {
          name: 'cpId',
          typeInfo: 'Int',
          attributeName: 'cp_id',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'ContextParameterType',
      propertyInfos: [{
          type: 'element',
          name: 'bound',
          elementName: 'bound',
          typeInfo: 'br_ufc_lia_storm.ContextContract'
        }, {
          type: 'element',
          name: 'boundValue',
          elementName: 'bound_value',
          typeInfo: 'String'
        }, {
          type: 'element',
          name: 'contextVariableRequired',
          elementName: 'context_variable_required',
          typeInfo: 'String'
        }, {
          type: 'element',
          name: 'contextArgument',
          elementName: 'context_argument',
          typeInfo: 'br_ufc_lia_storm.ContextArgumentType'
        }, {
          type: 'element',
          name: 'contextVariableProvided',
          elementName: 'context_variable_provided',
          typeInfo: 'String'
        }, {
          type: 'element',
          name: 'contextVariableRequiredId',
          elementName: 'context_variable_required_id',
          typeInfo: 'Int'
        }, {
          name: 'name',
          typeInfo: 'String',
          attributeName: 'name',
          type: 'attribute'
        }, {
          name: 'cpId',
          typeInfo: 'Int',
          attributeName: 'cp_id',
          type: 'attribute'
        }, {
          name: 'kind',
          typeInfo: 'Int',
          attributeName: 'kind',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'ContextArgumentValueType',
      propertyInfos: [{
          name: 'value',
          typeInfo: 'String',
          attributeName: 'value',
          type: 'attribute'
        }, {
          name: 'dataType',
          typeInfo: 'String',
          attributeName: 'data_type',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'CalculatedParameterType',
      propertyInfos: [{
          type: 'element',
          name: 'calculatedArgument',
          elementName: 'calculated_argument',
          typeInfo: 'br_ufc_lia_storm.CalculatedArgumentType'
        }, {
          name: 'name',
          typeInfo: 'String',
          attributeName: 'name',
          type: 'attribute'
        }, {
          name: 'calcId',
          typeInfo: 'Int',
          attributeName: 'calc_id',
          type: 'attribute'
        }, {
          name: 'kindId',
          typeInfo: 'Int',
          attributeName: 'kind_id',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'SliceType',
      propertyInfos: [{
          name: 'sliceId',
          typeInfo: 'Int',
          attributeName: 'slice_id',
          type: 'attribute'
        }, {
          name: 'innerComponentName',
          typeInfo: 'String',
          attributeName: 'inner_component_name',
          type: 'attribute'
        }, {
          name: 'innerUnityName',
          typeInfo: 'String',
          attributeName: 'inner_unity_name',
          type: 'attribute'
        },{
          type: 'element',
          name: 'innerComponentId',
          elementName: 'inner_component_id',
          typeInfo: 'Int'
        },{
          type: 'element',
          name: 'innerUnitId',
          elementName: 'inner_unit_id',
          typeInfo: 'Int'	
        }]
    }, {
      type: 'classInfo',
      localName: 'ContextArgumentType',
      propertyInfos: [{
          type: 'element',
          name: 'sharedVariableCpId',
          elementName: 'shared_variable_cp_id',
          typeInfo: 'Int'
        }, {
          type: 'element',
          name: 'contextContract',
          elementName: 'context_contract',
          typeInfo: 'br_ufc_lia_storm.ContextContract'
        }, {
          type: 'element',
          name: 'value',
          elementName: 'value',
          typeInfo: 'br_ufc_lia_storm.ContextArgumentValueType'
        }, {
          name: 'ccId',
          typeInfo: 'Int',
          attributeName: 'cc_id',
          type: 'attribute'
        }, {
          name: 'cpId',
          typeInfo: 'Int',
          attributeName: 'cp_id',
          type: 'attribute'
        }, {
          name: 'boundCcId',
          typeInfo: 'Int',
          attributeName: 'bound_cc_id',
          type: 'attribute'
        }, {
          name: 'caId',
          typeInfo: 'Int',
          attributeName: 'ca_id',
          type: 'attribute'
        }, {
          name: 'kind',
          typeInfo: 'Int',
          attributeName: 'kind',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'ConcreteComponentType',
      propertyInfos: [{
          type: 'element',
          name: 'abstractComponent',
          elementName: 'abstract_component',
          typeInfo: 'br_ufc_lia_storm.AbstractComponentType'
        }, {
          type: 'element',
          name: 'contextContract',
          elementName: 'context_contract',
          typeInfo: 'br_ufc_lia_storm.ContextContract'
        }]
    }],
  elementInfos: [{
      elementName: 'context_contract',
      typeInfo: 'br_ufc_lia_storm.ContextContract'
    }, {
      elementName: 'candidate_list',
      typeInfo: 'br_ufc_lia_storm.CandidateListType'
    }, {
      elementName: 'unit_file',
      typeInfo: 'br_ufc_lia_storm.UnitFileType'
    }, {
      elementName: 'concrete_unit',
      typeInfo: 'br_ufc_lia_storm.ConcreteUnitType'
    }, {
      elementName: 'contract_list',
      typeInfo: 'br_ufc_lia_storm.ContractList'
    }, {
      elementName: 'abstract_component',
      typeInfo: 'br_ufc_lia_storm.AbstractComponentType'
    }, {
      elementName: 'computational_system',
      typeInfo: 'br_ufc_lia_storm.ComputationalSystemType'
    }]
};
if (typeof require === 'function') {
  module.exports.br_ufc_lia_storm = br_ufc_lia_storm;
}