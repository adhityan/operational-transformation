{{- define "operational-transformation.default-env-config" -}}
- name: HOST
  valueFrom:
    configMapKeyRef:
      name: {{ include "operational-transformation.name" . }}-environment
      key: HOST
- name: NODE_ENV
  valueFrom:
    configMapKeyRef:
      name: {{ include "operational-transformation.name" . }}-environment
      key: NODE_ENV

- name: EXAMPLE
  valueFrom:
    secretKeyRef:
      name: {{ include "operational-transformation.name" . }}-secret
      key: EXAMPLE

- name: CONTAINER_NAME
  valueFrom:
    fieldRef:
      fieldPath: metadata.name
- name: K8_NAMESPACE
  value: {{.Release.Namespace}}
      
- name: DEBUG
  value: "GCNats:*"
{{- end -}}