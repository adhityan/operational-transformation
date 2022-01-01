{{/* vim: set filetype=mustache: */}}

{{- define "helm-toolkit.utils.joinListWithComma" -}}
{{- $local := dict "first" true -}}
{{- range $k, $v := . -}}{{- if not $local.first -}},{{- end -}}{{- $v -}}{{- $_ := set $local "first" false -}}{{- end -}}
{{- end -}}

{{/* Expand the name of the chart. */}}
{{- define "operational-transformation.name" -}}
{{- default .Chart.Name .Values.nameOverride | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/* Create chart name and version as used by the chart label. */}}
{{- define "operational-transformation.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "operational-transformation.certificateIssuer" -}}
{{ if eq (lower .Values.certificates.issuer) "external" }}{{ .Values.certificates.externalIssuerName }}{{ else }}{{ include "operational-transformation.name" . }}-issuer{{ end }}
{{- end -}}

{{/* Common labels */}}
{{- define "operational-transformation.labels" -}}
helm.sh/chart: {{ include "operational-transformation.chart" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/version: "{{ .Release.Revision }}"
app.kubernetes.io/author: "Adhityan"

app.kubernetes.io/name: {{ include "operational-transformation.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/* Selector labels for core */}}
{{- define "operational-transformation.coreSelectorLabels" -}}
app.kubernetes.io/component: "operational-transformation-core"
{{- end -}}

{{/* Docker config json */}}
{{- define "operational-transformation.docker-config" -}}
{{ if .Files.Glob "auth.docker.json" }}{{ .Files.Get "auth.docker.json" | b64enc }}
{{- else }}{{- printf "{ \"auths\": { \"https://index.docker.io/v1/\": { \"auth\": \"%s\" } } }" (printf "%s:%s" .Values.image.hubCredentials.username .Values.image.hubCredentials.password | b64enc) | b64enc }}{{- end }}
{{- end -}}

{{/* Pull secrets */}}
{{- define "operational-transformation.pull-secrets" -}}
{{ if .Values.image.pullSecrets }}
{{- .Values.image.pullSecrets }}
{{- end -}}
{{ if .Values.image.fromGcHub }}
- name: {{ include "operational-transformation.name" . }}-docker-config
{{- end -}}
{{- end -}}