var br_ufc_lia_storm = {
  name: 'br_ufc_lia_storm',
  //defaultElementNamespaceURI: 'http:\/\/storm.lia.ufc.br',
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
          typeInfo: 'br_ufc_lia_storm.ContextContract'
        }, {
          type: 'element',
          name: 'qualityArguments',
          collection: true,
          elementName: 'quality_arguments',
          typeInfo: 'br_ufc_lia_storm.QualityArgumentType'
        }, {
          type: 'element',
          name: 'rankingArguments',
          collection: true,
          elementName: 'ranking_arguments',
          typeInfo: 'br_ufc_lia_storm.RankingArgumentType'
        }, {
          type: 'element',
          name: 'costArguments',
          collection: true,
          elementName: 'cost_arguments',
          typeInfo: 'br_ufc_lia_storm.CostArgumentType'
        }, {
          type: 'element',
          name: 'innerComponents',
          collection: true,
          elementName: 'inner_components',
          typeInfo: 'br_ufc_lia_storm.ContextContract'
        }, {
          type: 'element',
          name: 'qualityFunctions',
          collection: true,
          elementName: 'quality_functions',
          typeInfo: 'br_ufc_lia_storm.QualityFunctionType'
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
          name: 'innerComponent',
          collection: true,
          elementName: 'inner_component',
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
          typeInfo: 'br_ufc_lia_storm.QualityParameterType'
        }, {
          type: 'element',
          name: 'costParameters',
          collection: true,
          elementName: 'cost_parameters',
          typeInfo: 'br_ufc_lia_storm.CostParameterType'
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
      localName: 'AbstractUnitType',
      propertyInfos: [{
          name: 'auName',
          typeInfo: 'String',
          attributeName: 'au_name',
          type: 'attribute'
        }, {
          name: 'abstractComponentName',
          typeInfo: 'String',
          attributeName: 'abstract_component_name',
          type: 'attribute'
        }, {
          name: 'auId',
          typeInfo: 'Int',
          attributeName: 'au_id',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'QualityArgumentType',
      propertyInfos: [{
          name: 'qpId',
          typeInfo: 'Int',
          attributeName: 'qp_id',
          type: 'attribute'
        }, {
          name: 'value',
          typeInfo: 'Double',
          attributeName: 'value',
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
        }]
    }, {
      type: 'classInfo',
      localName: 'QualityFunctionType',
      propertyInfos: [{
          type: 'element',
          name: 'functionParameters',
          collection: true,
          elementName: 'function_parameters',
          typeInfo: 'br_ufc_lia_storm.QualityFunctionTermType'
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
          name: 'functionName',
          typeInfo: 'String',
          attributeName: 'function_name',
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
        }]
    }, {
      type: 'classInfo',
      localName: 'CostParameterType',
      propertyInfos: [{
          type: 'element',
          name: 'costArgument',
          elementName: 'cost_argument',
          typeInfo: 'br_ufc_lia_storm.CostArgumentType'
        }, {
          name: 'name',
          typeInfo: 'String',
          attributeName: 'name',
          type: 'attribute'
        }, {
          name: 'copId',
          typeInfo: 'Int',
          attributeName: 'cop_id',
          type: 'attribute'
        }, {
          name: 'kindId',
          typeInfo: 'Int',
          attributeName: 'kind_id',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'RankingFunctionTermType',
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
      localName: 'ContextParameterType',
      propertyInfos: [{
          type: 'element',
          name: 'bound',
          elementName: 'bound',
          typeInfo: 'br_ufc_lia_storm.ContextContract'
        }, {
          type: 'element',
          name: 'contextVariable',
          elementName: 'context_variable',
          typeInfo: 'br_ufc_lia_storm.ContextContract'
        }, {
          type: 'element',
          name: 'value',
          elementName: 'value',
          typeInfo: 'String'
        }, {
          type: 'element',
          name: 'contextArgument',
          elementName: 'context_argument',
          typeInfo: 'br_ufc_lia_storm.ContextArgumentType'
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
        }]
    }, {
      type: 'classInfo',
      localName: 'CostFunctionTermType',
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
      localName: 'QualityFunctionTermType',
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
      localName: 'SliceType',
      propertyInfos: [{
          name: 'sliceId',
          typeInfo: 'Int',
          attributeName: 'slice_id',
          type: 'attribute'
        }, {
          name: 'innerComponentId',
          typeInfo: 'Int',
          attributeName: 'inner_component_id',
          type: 'attribute'
        }, {
          name: 'innerUnityId',
          typeInfo: 'Int',
          attributeName: 'inner_unity_id',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'QualityParameterType',
      propertyInfos: [{
          type: 'element',
          name: 'qualityArgument',
          elementName: 'quality_argument',
          typeInfo: 'br_ufc_lia_storm.QualityArgumentType'
        }, {
          name: 'name',
          typeInfo: 'String',
          attributeName: 'name',
          type: 'attribute'
        }, {
          name: 'qpId',
          typeInfo: 'Int',
          attributeName: 'qp_id',
          type: 'attribute'
        }, {
          name: 'kindId',
          typeInfo: 'Int',
          attributeName: 'kind_id',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'ContextArgumentType',
      propertyInfos: [{
          type: 'element',
          name: 'cpId',
          elementName: 'cp_id',
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
          typeInfo: 'String'
        }, {
          name: 'ccId',
          typeInfo: 'Int',
          attributeName: 'cc_id',
          type: 'attribute'
        }, {
          name: 'variableCpId',
          typeInfo: 'Int',
          attributeName: 'variable_cp_id',
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
      localName: 'RankingFunctionType',
      propertyInfos: [{
          type: 'element',
          name: 'functionParameters',
          collection: true,
          elementName: 'function_parameters',
          typeInfo: 'br_ufc_lia_storm.RankingFunctionTermType'
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
          name: 'functionName',
          typeInfo: 'String',
          attributeName: 'function_name',
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
    }, {
      type: 'classInfo',
      localName: 'CostFunctionType',
      propertyInfos: [{
          type: 'element',
          name: 'functionParameters',
          collection: true,
          elementName: 'function_parameters',
          typeInfo: 'br_ufc_lia_storm.CostFunctionTermType'
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
          name: 'functionName',
          typeInfo: 'String',
          attributeName: 'function_name',
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
        }]
    }, {
      type: 'classInfo',
      localName: 'CostArgumentType',
      propertyInfos: [{
          name: 'copId',
          typeInfo: 'Int',
          attributeName: 'cop_id',
          type: 'attribute'
        }, {
          name: 'value',
          typeInfo: 'Double',
          attributeName: 'value',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'RankingParameterType',
      propertyInfos: [{
          type: 'element',
          name: 'rankingArgument',
          elementName: 'ranking_argument',
          typeInfo: 'br_ufc_lia_storm.RankingArgumentType'
        }, {
          name: 'name',
          typeInfo: 'String',
          attributeName: 'name',
          type: 'attribute'
        }, {
          name: 'rankId',
          typeInfo: 'Int',
          attributeName: 'rank_id',
          type: 'attribute'
        }, {
          name: 'kindId',
          typeInfo: 'Int',
          attributeName: 'kind_id',
          type: 'attribute'
        }]
    }, {
      type: 'classInfo',
      localName: 'RankingArgumentType',
      propertyInfos: [{
          name: 'rankId',
          typeInfo: 'Int',
          attributeName: 'rank_id',
          type: 'attribute'
        }, {
          name: 'value',
          typeInfo: 'Double',
          attributeName: 'value',
          type: 'attribute'
        }]
    }],
  elementInfos: [{
      elementName: 'context_contract',
      typeInfo: 'br_ufc_lia_storm.ContextContract'
    }, {
      elementName: 'candidateList',
      typeInfo: 'br_ufc_lia_storm.CandidateListType'
    }, {
      elementName: 'abstract_component',
      typeInfo: 'br_ufc_lia_storm.AbstractComponentType',
    }]
};

if (typeof require === 'function') {
  module.exports.br_ufc_lia_storm = br_ufc_lia_storm;
}
